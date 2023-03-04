<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import router from "@/router";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const { user, userSession } = storeToRefs(useUserStore());
const { getAuthentication } = useUserStore();

onBeforeMount(() => {
  if (!userSession.value) {
    router.push({ name: "home" });
  } else if (userSession.value && !user.value.userId) {
    getAuthentication();
  }
});
// onMounted(() => {
//   console.log(user.value.userId);
// });
</script>

<template>
  <v-app id="app">
    <v-main app transition="slide-x-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
#app {
  background-color: #9fa8da;
}
</style>
