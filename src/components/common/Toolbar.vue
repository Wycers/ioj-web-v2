<template>
  <v-app-bar app color="white" height="55px">
    <v-btn small icon class="hidden-md-and-up" @click="toggleDrawer">
      <v-icon small>fa-bars</v-icon>
    </v-btn>
    <v-toolbar-title class="ml-0 pl-1 mr-1">
      <router-link
        :to="{ name: 'home' }"
        class="google-font"
        style="text-decoration:none; color: rgba(0,0,0,.87);"
      >
        Infinity OJ
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-for="(link, i) in links"
      :key="i"
      :to="link.to"
      class="ml-0 google-font hidden-sm-and-down"
      style="text-transform: capitalize;"
      text
      @click="onClick($event, link)"
    >
      {{ $t(link.text) }}
    </v-btn>
    <ToolbarAvatar />
  </v-app-bar>
</template>

<script>
// Utilities
import { mapMutations } from "vuex";
import ToolbarAvatar from "@/components/common/ToolbarAvatar.vue";
export default {
  components: {
    ToolbarAvatar
  },
  data() {
    return {
      links: [
        { text: "nav.home", to: "/", icon: "home" },
        { text: "nav.problem", to: "/p", icon: "rounded_corner" },
        { text: "nav.group", to: "/g", icon: "group" },
        { text: "nav.contest", to: "/c", icon: "toc" }
      ]
    };
  },
  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    }
  }
};
</script>
