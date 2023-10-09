import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    users: [],
    userId: "",
    user: null,
    isPreloader: false,
    searchUser: "",
    isError: false,
  },
  getters: {
    searchedUser(state) {
      if (state.searchUser.length == 0) {
        return;
      }
      let search = state.searchUser.split(/[^a-z]+/i).filter(Boolean);
      return state.users.filter((user) => search.includes(user.username));
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUserId(state, userId) {
      console.log(userId);
      state.userId = userId;
    },
    setUser(state, user) {
      state.user = user;
    },
    setPreloader(state, bool) {
      state.isPreloader = bool;
    },
    setError(state, bool) {
      state.isError = bool;
    },
    setSearchUser(state, searchUser) {
      state.searchUser = searchUser;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        commit("setUsers", response.data);
      } catch (e) {
        console.log(e);
        commit("setError", true);
      }
    },
    async fetchUser({ state, commit }) {
      try {
        commit("setPreloader", true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${state.userId}`);
        commit("setUser", response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => commit("setPreloader", false), 200);
      }
    },
  },
});
