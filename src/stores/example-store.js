import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { toRaw } from "vue";

export const usersDB = defineStore("users", {
  state: () => ({
    data: JSON.parse(LocalStorage.getItem("usersDB")),
  }),
  getters: {
    all: (state) => toRaw(state.data),
  },
  actions: {
    update(n) {
      this.data = n;
    },
  },
});

export const userSession = defineStore("userSessionData", {
  state: () => ({
    data: LocalStorage.getItem("userSession"),
  }),
  getters: {
    get: (state) => state.data,
  },
});
