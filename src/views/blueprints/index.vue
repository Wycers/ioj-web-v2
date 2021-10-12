<template>
  <div id="app">
    <VueBlocksContainer
      @contextmenu.native="showContextMenu"
      @click.native="closeContextMenu"
      ref="container"
      :blocksContent="blocks"
      :scene.sync="scene"
      @blockSelect="selectBlock"
      @blockDeselect="deselectBlock"
      class="container"
    />
    <VueBlockProperty :property="selectedBlockProperty" @save="saveProperty" />
    <label>
      <select name="type" v-model="selectedType">
        <template v-for="(type, k) in selectBlocksType">
          <optgroup :label="type" :key="k">
            <option
              v-for="(block, i) in filteredBlocks(type)"
              :key="i"
              :value="block.name"
              >{{ block.title || block.name }}</option
            >
          </optgroup>
        </template>
      </select>
    </label>
    <button @click.stop="addBlock">Add</button>
    |
    <label for="useContextMenu">
      <input type="checkbox" v-model="useContextMenu" id="useContextMenu" />Use
      right click for Add blocks
    </label>

    <ul
      id="contextMenu"
      ref="contextMenu"
      tabindex="-1"
      v-show="contextMenu.isShow"
      @blur="closeContextMenu"
      :style="{ top: contextMenu.top + 'px', left: contextMenu.left + 'px' }"
    >
      <template v-for="(type, k) in selectBlocksType">
        <li :key="k" class="label">{{ type }}</li>
        <li
          v-for="(block, i) in filteredBlocks(type)"
          :key="`li-${k}-${i}`"
          @click="addBlockContextMenu(block.name)"
        >
          {{ block.title || block.name }}
        </li>
      </template>
    </ul>
    <div>
      {{ scene }}
    </div>
    <div>
      {{ blocks }}
    </div>
  </div>
</template>

<script>
import merge from 'deepmerge';

import VueBlocksContainer from '@/lib/vue-blocks/src/components/VueBlocksContainer';
import VueBlockProperty from '@/lib/vue-blocks/src/components/VueBlockProperty';
import domHelper from '@/lib/vue-blocks/src/helpers/dom';

import { getBlueprint } from '@/api/blueprint';
import { getPrograms } from '@/api/program';

export default {
  name: 'App',
  components: {
    VueBlocksContainer,
    VueBlockProperty,
  },
  data: function() {
    return {
      blocks: [],
      scene: {},
      selectedBlock: null,
      selectedType: 'delay',
      useContextMenu: true,
      contextMenu: {
        isShow: false,
        mouseX: 0,
        mouseY: 0,
        top: 0,
        left: 0,
      },
    };
  },
  computed: {
    selectedBlockProperty() {
      if (
        !this.selectedBlock ||
        !this.selectedBlock.values ||
        !this.selectedBlock.values.property
      ) {
        return null;
      }

      return this.selectedBlock.values.property;
    },
    selectBlocksType() {
      return this.blocks
        .map(b => {
          return b.family;
        })
        .filter((value, index, array) => {
          return array.indexOf(value) === index;
        });
    },
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    selectBlock(block) {
      console.log('select', block);
      this.selectedBlock = block;
    },
    deselectBlock(block) {
      console.log('deselect', block);
      this.selectedBlock = null;
    },
    filteredBlocks(type) {
      return this.blocks.filter(value => {
        return value.family === type;
      });
    },
    addBlock() {
      console.log(this.selectedType);
      this.$refs.container.addNewBlock(this.selectedType);
    },
    saveProperty(val) {
      console.log(val);

      const scene = this.scene;
      const block = scene.blocks.find(b => {
        return b.id === this.selectedBlock.id;
      });
      block.values.property = val;

      this.scene = merge({}, scene);
    },
    showContextMenu(e) {
      if (!this.useContextMenu) return;
      if (e.preventDefault) e.preventDefault();

      this.contextMenu.isShow = true;
      this.contextMenu.mouseX = e.x;
      this.contextMenu.mouseY = e.y;

      this.$nextTick(function() {
        this.setMenu(e.y, e.x);
        this.$refs.contextMenu.focus();
      });
    },
    setMenu(top, left) {
      const border = 5;
      const contextMenuEl = this.$refs.contextMenu;
      const containerElRect = this.$refs.container.$el.getBoundingClientRect();
      const largestWidth =
        containerElRect.right - contextMenuEl.offsetWidth - border;
      const largestHeight =
        containerElRect.bottom - contextMenuEl.offsetHeight - border;

      console.log(this.$refs.container);
      console.log(containerElRect);

      if (left > largestWidth) left = largestWidth;
      if (top > largestHeight) top = largestHeight;

      this.contextMenu.top = top;
      this.contextMenu.left = left;
    },
    addBlockContextMenu(name) {
      const offset = domHelper.getOffsetRect(this.$refs.container.$el);
      const x = this.contextMenu.mouseX - offset.left;
      const y = this.contextMenu.mouseY - offset.top;

      this.$refs.container.addNewBlock(name, x, y);
      this.closeContextMenu();
    },
    closeContextMenu() {
      this.contextMenu.isShow = false;
    },

    async fetchBlueprints() {
      try {
        const res = await getBlueprint(this.id);
        console.log(res);
        this.scene = JSON.parse(res.definition);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchPrograms() {
      try {
        const res = await getPrograms();
        console.log(res);
        this.blocks = res.map(item => JSON.parse(item.definition));
      } catch (err) {
        console.log(err);
      }
    },

    async fetch() {
      await this.fetchPrograms();
      await this.fetchBlueprints();
    },
  },
  watch: {
    blocks(newValue) {
      console.log('blocks', JSON.stringify(newValue));
    },
    scene(newValue) {
      console.log('scene', JSON.stringify(newValue));
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}

html {
  width: 100vw;
  height: 100vh;
}

body {
  width: 100%;
  height: 100%;
}

#app {
  width: ~'calc(100% - 40px)';
  height: ~'calc(100% - 40px)';
  padding: 20px 0 0 20px;
}

.container {
  width: 100%;
  height: ~'calc(100% - 50px)';
  border: 1px solid black;
}

#contextMenu {
  position: absolute;
  z-index: 1000;
  background: white;
  border: 1px solid black;
  padding: 5px;
  margin: 0;

  li {
    &.label {
      color: gray;
      font-size: 90%;
    }
    list-style: none;
  }

  &:focus {
    outline: none;
  }
}
</style>
