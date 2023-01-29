<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";
import { useWordStore } from "../stores/words";

const wordStore = useWordStore();
const userStore = useUserStore();
</script>

<template>
  <v-container fluid>
    <v-row>
      <h3 v-if="userStore.user">Welcome {{ userStore.user.username }}!</h3>
      <v-spacer />
      <v-btn @click="userStore.logout()" rounded small flat>LOGOUT</v-btn>
    </v-row>
    <v-row>
      <v-col>
        <!-- Add router-links  -->
        <v-btn :to="{ name: 'progress' }" @click="wordStore.getUserWords" flat
          >PROGRESS</v-btn
        >
        |
        <v-btn :to="{ name: 'test' }" flat @click="wordStore.getUserWords">TEST</v-btn>
        |
        <v-btn :to="{ name: 'addword' }" flat>ADD WORDS</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <RouterView />
    </v-row>
  </v-container>
</template>
<style lang="css" scoped>
.list {
  background-color: inherit;
  color: green;
}
.btn {
  background-color: #282828;
  color: #fafafa;
}
</style>
