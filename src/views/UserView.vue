<script setup>
import { ref, onMounted } from "vue";
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

onMounted(() => {
  console.log(user.value);
});
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-app-bar color="#c5cae9">
      <v-app-bar-title v-if="user.username">
        <div
          class="font-weight-black text-center home-title text-h5 text-indigo-lighten-1"
        >
          Welcome {{ user.username }} !
        </div>
      </v-app-bar-title>
    </v-app-bar>
    <v-row align="center" justify="center" class="pa-0">
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
