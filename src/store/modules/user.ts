import { Module, GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from '../index';
import { signin, recover, signout, getRole } from '@/api/user';

interface User {
  username: string;
  role: Array<string> | null;
}

export interface UserState {
  user?: User;
  error: boolean;
}

const namespaced = true;

const getters: GetterTree<UserState, RootState> = {
  username(state: UserState): string {
    const { user } = state;
    return (user && user.username) || '';
  },
  role(state: UserState): Array<string> | null {
    const { user } = state;
    return (user && user.role) || null;
  },
};

const state: UserState = {
  user: undefined,
  error: false,
};

const mutations: MutationTree<UserState> = {
  setRole(state, role: Array<string>) {
    if (state.user) {
      state.user.role = role;
    }
  },
  login(state, user: User) {
    state.error = false;
    state.user = user;
  },
  logout(state) {
    state.user = undefined;
    state.error = false;
  },
};

const actions: ActionTree<UserState, RootState> = {
  async recover({ commit }) {
    const res = await recover();
    const user: User = {
      username: res.name,
      role: null,
    };
    commit('login', user);
  },
  async login({ dispatch }, { username, password }) {
    await signin(username, password);
    await dispatch('recover');
  },
  async logout({ commit }) {
    await signout();
    commit('logout');
  },
  async getRole({ commit }): Promise<string[]> {
    const res = await getRole();
    const role = res.roles || [];
    commit('setRole', role);
    return role;
  },
};

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export default user;
