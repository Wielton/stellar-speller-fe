<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { createAccountForm } = storeToRefs(userStore);
const { createAccount } = userStore;
</script>
<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center" class="pa-6">
      <v-col cols="12" class="pa-6">
        <h2>Create an account and begin tracking!</h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="ma-0">
      <v-card max-width="350px" elevation="6">
        <v-form style="background-color: #89acd2ff">
          <v-row align="center" justify="center">
            <v-col cols="12" class="pa-6">
              <v-text-field
                v-model="createAccountForm.username"
                type="name"
                bg-color="#f4f1f1ff"
                color="#0081a7"
                label="Username"
                placeholder="Create a username"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-6">
              <v-text-field
                v-model="createAccountForm.password"
                type="password"
                bg-color="#f4f1f1ff"
                label="Password"
                placeholder="Create a password"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="6" md="6">
              <v-btn
                rounded
                color="#3c6e71"
                @click="
                  createAccount(
                    createAccountForm.username,
                    createAccountForm.password
                  )
                "
              >
                Create Account
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <p>
                Already have an account?
                <span></span>
                <router-link :to="{ name: 'login' }"> Login </router-link>
              </p>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>
<style scoped lang="css"></style>
