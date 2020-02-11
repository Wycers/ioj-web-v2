<template>
  <v-app>
    <Drawer />
    <Toolbar />
    <v-content id="home">
      <v-slide-y-reverse-transition>
        <router-view v-show="show" />
      </v-slide-y-reverse-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Drawer from "@/components/common/Drawer.vue";
import Toolbar from "@/components/common/Toolbar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Drawer,
    Toolbar
  },
  data() {
    return {
      show: true
    };
  }
});
</script>
