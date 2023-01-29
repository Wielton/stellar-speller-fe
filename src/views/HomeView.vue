<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
</script>

<template>
  <v-container fluid>
    <v-row justify-center>
      <v-col cols="12" md="12" lg="12">
        <h1>Welcome Back Stellar Speller</h1>
        <h3>Track your progress and perfect your spelling!</h3>
        <!-- This is a hack-way of  -->
        <v-btn v-if="!userStore.user.userId" :to="{ name: 'login' }">LOGIN</v-btn>
        <v-btn
          v-if="userStore.user.userId"
          :to="{ name: 'user', params: { userId: userStore.user.userId } }"
          >HOME</v-btn
        >
        <v-btn v-if="userStore.user.userId" @click="userStore.logout()">Logout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="css" scoped>
h1,
h3 {
  color: rgba(27, 37, 116, 0.6);
}
</style>
