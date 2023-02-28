<template>
  <v-form @submit.prevent="submit">
    <base-input v-model="event.title" label="Email" type="email"></base-input>
    <base-input
      v-model="event.title"
      label="Password"
      type="password"
    ></base-input>
  </v-form>
</template>
<script setup>
import BaseInput from "./BaseInput.vue";
</script>
