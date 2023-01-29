<script setup>
import { RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "./stores/user";

const { user, userSession } = storeToRefs(useUserStore());
const { getAuthentication } = useUserStore();
if (!userSession) {
  console.log("No sessionToken found");
} else {
  getAuthentication();
  console.log(user.value);
}
</script>

<template>
  <RouterView />
</template>

<style lang="css" scoped></style>
