import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { toRaw } from "vue";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    count: (state) => {
      return "A contagem é " + state.counter;
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
    local() {
      LocalStorage.set("user1", ["1234", 4567]);
    },
    get() {
      localStorage.getItem("user1");
      /* console.log(lol);
      return lol; */
    },
  },
});

export const usersDB = defineStore("users", {
  state: () => ({
    data: [],
  }),
  getters: {
    all: (state) => state.data,
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
