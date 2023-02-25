<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { createAccountForm } = storeToRefs(userStore);
const { createAccount } = userStore;
</script>
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-form color="transparent">
        <v-row align="center" justify="center">
          <v-col cols="12" class="pa-6">
            <v-text-field
              variant="solo"
              v-model="createAccountForm.username"
              type="name"
              label="Username"
              placeholder="Create a username"
              bg-color="indigo-lighten-5"
              color="indigo-darken-2"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-6">
            <v-text-field
              variant="solo"
              v-model="createAccountForm.password"
              type="password"
              label="Password"
              bg-color="indigo-lighten-5"
              color="indigo-darken-2"
              placeholder="Create a password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="pa-1 ma-0">
          <v-col cols="12" sm="6" md="6">
            <v-btn
              flat
              color="indigo-lighten-2"
              @click="
                createAccount(
                  createAccountForm.username,
                  createAccountForm.password
                )
              "
            >
              Signup
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <p>
              Already have an account?
              <br />
              <span>
                <router-link :to="{ name: 'login' }"> Go to Login </router-link>
              </span>
            </p>
          </v-col>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>
