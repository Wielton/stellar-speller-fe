<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { createAccountForm } = storeToRefs(userStore);
const { createAccount } = userStore;
</script>
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-form title="Create A Stellar Speller Account">
          <v-text-field
            v-model="createAccountForm.username"
            type="name"
            color="#284b63"
            label="Username"
            placeholder="Create a username"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="createAccountForm.password"
            type="password"
            color="#284b63"
            label="Password"
            placeholder="Create a password"
            outlined
            required
          ></v-text-field>
          <v-btn
            rounded
            color="#3c6e71"
            @click="createAccount(createAccountForm.username, createAccountForm.password)"
          >
            Create Account
          </v-btn>
          <p>
            Already have an account?
            <br />
            <v-btn rounded color="#0081a7" :to="{ name: 'login' }"> To Login </v-btn>
          </p>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"><h2>Create an account and begin tracking!</h2> </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="css"></style>
