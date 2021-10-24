<template>
  <v-main id="home" class="pb-0">
    <v-slide-y-reverse-transition>
      <router-view v-show="show" />
    </v-slide-y-reverse-transition>
  </v-main>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CoreView',
  data() {
    return {
      show: true,
    };
  },
});
</script>
