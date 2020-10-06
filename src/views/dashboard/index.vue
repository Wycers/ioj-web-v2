<template>
  <v-container fluid class="my-4" id="dashboard-view" dark>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-container>
</template>
<script>
export default {
  name: 'Dashboard',
  metaInfo() {
    return {
      title: 'IOJ | Dashboard',
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@/styles/dashboard/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
