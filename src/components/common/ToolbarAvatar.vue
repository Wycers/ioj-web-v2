<template lang="pug">
v-menu(offset-y, open-on-hover)
  template(v-slot:activator='{ on }')
    v-avatar(v-on='on', color='grey lighten-4', :size='44')
      //- img(
      //-   src='http://cdn.wycer.cn/0f2a8a4f-b69d-4331-b236-bd30293a8724',
      //-   alt='avatar'
      //- )
      v-icon mdi-account
  v-list(nav)
    nav-item(
      v-for='route in permissionRoutes',
      :key='route.path',
      :item='route',
      :base-path='route.path'
    )
    v-list-item(to='/credential/reset')
      v-list-item-title {{ $t("nav.reset") }}
    v-divider
    v-list-item(@click='logout')
      v-list-item-title {{ $t("nav.logout") }}
</template>
<script>
import { mapGetters } from 'vuex';

import NavItem from '@/components/common/NavItem';
export default {
  name: 'ToolbarAvatar',
  components: {
    'nav-item': NavItem,
  },
  computed: {
    ...mapGetters({
      permissionRoutes: 'route/permissionRoutes',
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>
