<template>
  <v-app>
    <transition mode="out-in" name="slide-y-transition">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App"
});
</script>
