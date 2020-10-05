import { Module, GetterTree, ActionTree, MutationTree } from 'vuex';
import { RootState } from '../index';
import { signin, recover, signout } from '@/api/user';

interface User {
  username: string;
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
};

const state: UserState = {
  user: undefined,
  error: false,
};

const mutations: MutationTree<UserState> = {
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
    try {
      const res = await recover();
      console.log('recover', res);
      const user: User = {
        username: res.name,
      };
      commit('login', user);
    } catch (err) {
      console.log(err);
    }
  },
  async login({ dispatch }, { username, password }): Promise<void> {
    await signin(username, password);
    await dispatch('recover');
  },
  async logout({ commit }) {
    await signout();
    commit('logout');
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
