<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <v-list-item
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
        active-class="primary"
        class="v-list-item"
      >
        <v-list-item-icon>
          <v-icon>
            {{ onlyOneChild.meta.icon || (item.meta && item.meta.icon) }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ onlyOneChild.meta.title }}</v-list-item-title>
      </v-list-item>
    </template>

    <v-list-group
      v-else
      ref="subMenu"
      no-action
      sub-group
      value="false"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title
            v-if="item.meta"
            :icon="item.meta && item.meta.icon"
            >{{ item.meta.title }}</v-list-item-title
          >
        </v-list-item-content>
      </template>
      <nav-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </v-list-group>
  </div>
</template>

<script>
import path from 'path';
// import { generateTitle } from '@/utils/i18n'
import { isExternal } from '@/utils/validate';
// import Item from './Item'
// import FixiOSBug from './FixiOSBug'
export default {
  name: 'nav-item',
  //   mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    // generateTitle
  },
};
</script>

<style lang="scss">
// .v-list__item {
//   border-radius: 4px;

//   &--buy {
//     margin-top: auto;
//     margin-bottom: 17px;
//   }
// }

// .v-image__image--contain {
//   top: 9px;
//   height: 60%;
// }

// .search-input {
//   margin-bottom: 30px !important;
//   padding-left: 15px;
//   padding-right: 15px;
// }
</style>
