<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { loginForm } = storeToRefs(userStore);
const { login } = userStore;
</script>
<template>
  <!-- 
        
                - This view will have a login form and a registration form
                - Only one will be rendered, but need to decide how to render. 
                - Before entering LoginView or upon mounting of LoginView and the login form renders initially
        
        -->

  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" class="pa-6">
        <h2>Welcome back Stellar Speller</h2>
        <p>Login to continue your journey!</p>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-card max-width="350px" elevation="6">
        <v-form style="background-color: #89acd2ff">
          <v-row align="center" justify="center">
            <v-col cols="12" class="pa-6">
              <v-text-field
                v-model="loginForm.username"
                type="name"
                label="Username"
                bg-color="#f4f1f1ff"
                placeholder="Enter your username"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pa-6">
              <v-text-field
                v-model="loginForm.password"
                type="password"
                label="Password"
                bg-color="#f4f1f1ff"
                placeholder="Enter your password"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" class="pa-1 ma-0">
            <v-col cols="12" sm="6" md="6">
              <v-btn
                flat
                rounded
                color="#3c6e71"
                @click="login(loginForm.username, loginForm.password)"
              >
                LOGIN
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="6"
              ><p>
                Need to create an account?
                <span
                  ><router-link
                    color="#0081a7"
                    rounded
                    :to="{
                      name: 'register',
                    }"
                    >Signup</router-link
                  ></span
                >
              </p></v-col
            >
          </v-row>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>
