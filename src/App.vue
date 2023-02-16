<script setup>
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

const store = useUserStore();
const { user, userSession } = storeToRefs(store);
const { getAuthentication } = store;

onBeforeMount(() => {
  console.log(userSession, user);
  if (userSession.value && !user.value) {
    getAuthentication();
  }
});
onMounted(() => {
  console.log(user);
});
</script>

<template>
  <v-app id="app">
    <v-main id="app-main">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="css" scoped>
#app {
  background-color: #89acd2ff;
}
</style>
