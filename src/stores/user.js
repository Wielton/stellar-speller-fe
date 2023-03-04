import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import cookies from "vue-cookies";
import { useAlertStore } from "./alert";
import { useWordStore } from "./words";
import { useAnswerStore } from "./answers";

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
      username: null,
      userId: null,
    },
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
          this.user.username = response.data.username;
          this.user.userId = response.data.userId;
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
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
          this.user.username = response.data.username;
          this.user.userId = response.data.userId;
          cookies.set("sessionToken", response.data.sessionToken);
          router.push({ name: "user", params: { userId: this.user.userId } });
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
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
          const userData = response.data;
          this.user.username = userData.username;
          this.user.userId = userData.userId;
          cookies.set("sessionToken", userData.sessionToken);
          router.push({
            name: "user",
            params: { userId: this.user.userId },
          });
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
        });
    },
    async logout() {
      const wordStore = useWordStore();
      const answerStore = useAnswerStore();
      await axios
        .request({
          url: import.meta.env.VITE_API_URL + "user-session",
          method: "DELETE",
          params: {
            sessionToken: cookies.get("sessionToken"),
          },
        })
        .then(() => {
          cookies.remove("sessionToken");
          wordStore.$reset();
          answerStore.$reset();
          this.$reset();
          router.push({ name: "home" });
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
        });
    },
  },
});
