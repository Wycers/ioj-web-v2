<template>
  <v-app>
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
import Toolbar from "@/components/common/Toolbar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Toolbar
  },
  data() {
    return {
      show: true
    };
  }
});
</script>
