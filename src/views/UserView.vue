<script setup>
import { onBeforeMount, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useWordStore } from "../stores/words";
import { useAnswerStore } from "../stores/answers";
// import { useTestStore } from "../stores/test";

const { getAllAnswers } = useAnswerStore();
const { getUserWords } = useWordStore();
// const { userWords } = storeToRefs(useWordStore())
const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
// const { filterTestWords } = useTestStore();

onBeforeMount(() => {
  getUserWords();
  getAllAnswers();
});
onUpdated(() => {
  getUserWords();
  getAllAnswers();
});
</script>

<template>
  <v-layout>
    <v-main app>
      <h3 v-if="user.userId != null">Welcome {{ user.username }}!</h3>
      <RouterView />
    </v-main>

    <v-bottom-navigation app transparent>
      <!-- Add router-links  -->
      <v-btn :to="{ name: 'user' }" flat>HOME</v-btn>
      <v-btn :to="{ name: 'test' }" flat>TEST</v-btn>
      <v-btn :to="{ name: 'addword' }" flat>ADD</v-btn>
      <v-btn @click="logout()" rounded small flat>LOGOUT</v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>
<style lang="css" scoped>
.v-btn {
  background-color: #284b63;
  color: #fafafa;
}
.v-bottom-navigation {
  background-color: #3c6e71;
}
</style>
