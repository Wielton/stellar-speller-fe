<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

// import { useTestStore } from "../stores/test";

const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="pa-0">
      <h3 v-if="user != null">Welcome {{ user.username }} !</h3>
      <RouterView />
    </v-row>

    <v-bottom-navigation v-if="user != null" transparent>
      <!-- Add router-links  -->
      <!-- eslint-disable-next-line prettier/prettier -->
      <v-btn :to="{ name: 'user', params: { userId: user.userId } }" flat> HOME</v-btn>
      <v-btn :to="{ name: 'test' }" flat>TEST</v-btn>
      <v-btn :to="{ name: 'addword' }" flat>ADD</v-btn>
      <v-btn @click="logout()" rounded small flat>LOGOUT</v-btn>
    </v-bottom-navigation>
  </v-container>
</template>
<style lang="css" scoped>
.v-btn {
  background-color: #667bc7ff;
  color: #f4f1f1ff;
}
h3 {
  color: #f4f1f1ff;
}
.v-bottom-navigation {
  background-color: #89acd2ff;
}
</style>
