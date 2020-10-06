// profile/index.ts
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from '../index';
import { set } from '@/utils/vuex';
import { RouteConfig } from 'vue-router';
import { asyncRoutes, constantRoutes } from '@/router';

const namespaced = true;

export interface RouteState {
  routes: Array<RouteConfig>;
  addRoutes: Array<RouteConfig>;
}

const state: RouteState = {
  routes: [],
  addRoutes: [],
};

const getters: GetterTree<RouteState, RootState> = {
  permissionRoutes(state: RouteState): Array<RouteConfig> {
    const { routes } = state;
    return routes;
  },
};

const mutations: MutationTree<RouteState> = {
  setAddRoutes: set('addRoutes'),
  setRoutes: set('routes'),
};

function hasPermission(route: RouteConfig, roles: Array<string>): boolean {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role));
  }
  return true;
}

function filterAsyncRoutes(
  routes: Array<RouteConfig>,
  roles: Array<string>
): Array<RouteConfig> {
  const res: Array<RouteConfig> = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const actions: ActionTree<RouteState, RootState> = {
  async generateRoutes({ commit }, roles) {
    const accessedRoutes = roles.includes('admin')
      ? asyncRoutes
      : filterAsyncRoutes(asyncRoutes, roles);
    console.log('???', roles);
    console.log('?', accessedRoutes);
    commit('setAddRoutes', accessedRoutes);
    commit('setRoutes', constantRoutes.concat(accessedRoutes));
    return accessedRoutes;
  },
};

const route: Module<RouteState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export default route;
