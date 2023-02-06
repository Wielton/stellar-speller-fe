import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import cookies from "vue-cookies";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoading: false,
    userSession: cookies.get("sessionToken"),
    loginForm: {
      username: "",
      password: "",
    },
    createAccountForm: {
      username: "",
      password: "",
    },
    user: {
      userId: null,
      username: null,
    },
    errMessage: null,
    returnUrl: null,
  }),

  actions: {
    async getAuthentication() {
      await axios
        .request({
          url: import.meta.env.VITE_API_URL + "user",
          method: "GET",
          params: {
            sessionToken: cookies.get("sessionToken"),
          },
        })
        .then((response) => {
          this.user = response.data;
        })
        .catch((err) => {
          this.errMessage = err.data;
        });
    },
    async createAccount(username, password) {
      await axios
        .request({
          url: import.meta.env.VITE_API_URL + "user",
          method: "POST",
          data: {
            username,
            password,
          },
        })
        .then((response) => {
          this.user = response.data;
          cookies.set("sessionToken", response.data.sessionToken);
          router.push({ name: "user", params: { userId: this.user.userId } });
        })
        .catch((err) => {
          this.errMessage = err.data;
        });
    },
    async login(username, password) {
      await axios
        .request({
          url: import.meta.env.VITE_API_URL + "user-session",
          method: "POST",
          data: {
            username,
            password,
          },
        })
        .then((response) => {
          this.user = response.data;
          cookies.set("sessionToken", response.data.sessionToken);
          router.push({ name: "user", params: { userId: this.user.userId } });
        })
        .catch((err) => {
          this.errMessage = err.data;
        });
    },
    async logout() {
      await axios
        .request({
          url: import.meta.env.VITE_API_URL + "user-session",
          method: "DELETE",
          params: {
            sessionToken: cookies.get("sessionToken"),
          },
        })
        .then((response) => {
          console.log(response);
          this.user = null;
          cookies.remove("sessionToken");
          router.push({ name: "home" });
        })
        .catch((err) => {
          this.errMessage = err.data;
        });
    },
  },
});
