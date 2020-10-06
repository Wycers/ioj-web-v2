import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import route from './modules/route';

Vue.use(Vuex);

export interface RootState {
  drawer: boolean;
  links: Array<Record<string, string>>;
}

export default new Vuex.Store<RootState>({
  modules: {
    user,
    route,
  },
  state: {
    drawer: false,
    links: [
      { text: 'nav.home', to: '/', icon: 'mdi-home' },
      { text: 'nav.problem', to: '/p', icon: 'mdi-puzzle' },
      // { text: "nav.group", to: "/g", icon: "mdi-account-group" },
      // { text: 'nav.contest', to: '/c', icon: 'mdi-feather' },
    ],
  },
  getters: {
    links: state => {
      return state.links;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {},
});
