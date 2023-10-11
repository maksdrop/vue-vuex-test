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
  getters: {},
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setUserId(state, userId) {
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
    async fetchUsers({state, commit }, data) {
      try {
        commit("setSearchUser", data.value);
        if (data.value.length == 0) {
          return;
        }
        
        let search = data.value.split(/[^a-z0-9~!@#$%^&*()_|+\-=?;:'".<>]+/i).filter(Boolean).join('&username=')
        let url = `https://jsonplaceholder.typicode.com/users?username=${search}`;
        const response = await axios.get(url);
        commit("setUsers", response.data);

        if (data.userId) {
          let result = state.users.filter((user) => user.id == data.userId);

          if (result.length == 0) {
            commit("setUserId", "");
            commit("setUser", null);
          }
        }
      } catch (e) {
        console.log(e);
        commit("setError", true);
      }
    },
    selectUser({ state, commit }, userId) {
      try {
        commit("setPreloader", true);
        commit("setUserId", userId);
        let result = state.users.filter((user) => user.id == userId);
        commit("setUser", result);
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => commit("setPreloader", false), 200);
      }
    },
  },
});
