<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { loginForm } = storeToRefs(userStore);
const { login } = userStore;
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-form color="transparent">
        <v-row align="center" justify="center">
          <v-col cols="12" class="pa-6">
            <v-text-field
              variant="solo"
              v-model="loginForm.username"
              type="text"
              label="Username"
              bg-color="indigo-lighten-5"
              color="indigo-darken-2"
              placeholder="Enter your username"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="pa-6">
            <v-text-field
              variant="solo"
              v-model="loginForm.password"
              type="password"
              label="Password"
              bg-color="indigo-lighten-5"
              color="indigo-darken-2"
              placeholder="Enter your password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="pa-1 ma-0">
          <v-col cols="12" sm="6" md="6">
            <v-btn
              flat
              color="indigo-lighten-2"
              @click="login(loginForm.username, loginForm.password)"
            >
              LOGIN
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6"
            ><p>
              Need to create an account?
              <br />
              <span
                ><router-link
                  :to="{
                    name: 'register',
                  }"
                  >Go To Signup</router-link
                ></span
              >
            </p></v-col
          >
        </v-row>
      </v-form>
    </v-row>
  </v-container>
</template>
