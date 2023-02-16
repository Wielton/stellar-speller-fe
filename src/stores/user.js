import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import cookies from "vue-cookies";
import { useAlertStore } from "./alert";
import { useAnswerStore } from "./answers";
import { useTestStore } from "./test";
import { useWordStore } from "./words";

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
    user: null,
    returnUrl: null,
  }),
  actions: {
    async getAuthentication() {
      this.user = null;
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
          this.createAccountForm.username = "";
          this.createAccountForm.password = "";
          this.user = response.data;
          cookies.set("sessionToken", this.user.sessionToken);
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
          this.loginForm.username = "";
          this.loginForm.password = "";
          this.user = response.data;
          cookies.set("sessionToken", response.data.sessionToken);
          router.push({ name: "user", params: { userId: this.user.userId } });
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
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
        .then(() => {
          const testStore = useTestStore();
          const wordStore = useWordStore();
          const answerStore = useAnswerStore();
          testStore.$reset();
          wordStore.$reset();
          answerStore.$reset();
          cookies.remove("sessionToken");
          router.push({ name: "home" });
          this.user = null;
          console.log("stores reset", wordStore.userWords);
        })
        .catch((error) => {
          const alertStore = useAlertStore();
          alertStore.error(error);
        });
    },
  },
});
