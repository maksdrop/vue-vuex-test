import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    users: [],
    userId: "",
    user: null,
    isPreloader: false,
    isPreloaderUsers: false,
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
    setPreloaderUsers(state, bool) {
      state.isPreloaderUsers = bool;
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
        commit("setPreloaderUsers", true);
        commit("setSearchUser", data.value);
        if (data.value.length == 0) {
          return;
        }
        
        let search = data.value.split(/[^a-z0-9~!@#$%^&*()_|+\-=?;:'".<>]+/i).filter(Boolean).join('&username=')
        let url = `https://jsonplaceholder.typicode.com/users?username=${search}`;
        console.log(url)
        const response = await axios.get(url);
        console.log(response.data)
        commit("setUsers", response.data);

        if (data.userId) {
          let result = state.users.filter((user) => user.id == data.userId);

          if (result.length == 0) {
            commit("setUserId", "");
            commit("setUser", null);
          }
        }
      } catch (e) {
        console.log("error", e);
        commit("setError", true);
      } finally {
        setTimeout(() => commit("setPreloaderUsers", false), 200);
      }
    },
    selectUser({ state, commit }, userId) {
        commit("setPreloader", true);
        commit("setUserId", userId);
        let result = state.users.filter((user) => user.id == userId);
        commit("setUser", result);
        setTimeout(() => commit("setPreloader", false), 200);
      
    },
  },
});
