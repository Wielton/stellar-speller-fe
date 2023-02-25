<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

// import { useTestStore } from "../stores/test";

const { user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const links = ref([
  { name: "user", title: "Progress", path: "" },
  { name: "test", title: "Test", path: "test" },
  { name: "addword", title: "Add", path: "addword" },
]);
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" class="pa-0">
      <div
        class="font-weight-bold text-center home-title text-h4 text-indigo-lighten-1"
        v-if="user.username"
      >
        Welcome {{ user.username }} !
      </div>
      <v-col cols="12" transition="slide-x-transition" class="pa-4">
        <router-view></router-view>
      </v-col>
    </v-row>

    <v-bottom-navigation
      app
      v-if="user.userId"
      bg-color="indigo-lighten-2"
      grow
    >
      <!-- Add router-links  -->
      <!-- eslint-disable-next-line prettier/prettier -->
      <v-btn v-for="link,index in links" :key="index" :to='link' flat exact>{{link.title}}</v-btn>
      <v-btn @click="logout()" rounded small flat>LOGOUT</v-btn>
    </v-bottom-navigation>
  </v-container>
</template>
<style lang="css" scoped>
.v-btn {
  background-color: #5c6bc0;
  color: #f4f1f1ff;
}

h3 {
  color: #f4f1f1ff;
}

.v-bottom-navigation {
  background-color: #89acd2ff;
}
</style>
