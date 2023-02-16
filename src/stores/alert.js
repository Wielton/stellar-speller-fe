/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";


export const useAlertStore = defineStore("alert", {

  state: () => ({
    alert: null,
  }),
  actions: {
    success(message) {
      this.alert = { message, type: "alert-success" }
    },
    error(message) {
      this.alert = { message, type: "alert-failure" }
    },
    clear() {
      this.alert = null
    },
  }
});