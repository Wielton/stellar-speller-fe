<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { loginForm } = storeToRefs(userStore);
const { login } = userStore;
// console.log(userStore.allUsernames);
</script>
<template>
  <!-- 
        
                - This view will have a login form and a registration form
                - Only one will be rendered, but need to decide how to render. 
                - Before entering LoginView or upon mounting of LoginView and the login form renders initially
        
        -->
  <v-container>
    <v-row align-center justify-center>
      <v-col cols="12">
        <v-form title="Login To Stellar Speller">
          <v-text-field
            v-model="loginForm.username"
            type="name"
            color="primary"
            label="Username"
            placeholder="Enter your username"
            outlined
          ></v-text-field>

          <v-text-field
            v-model="loginForm.password"
            type="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            outlined
          ></v-text-field>
          <v-btn
            rounded
            color="#3c6e71"
            @click="login(loginForm.username, loginForm.password)"
          >
            LOGIN
          </v-btn>
          <p>
            Need to create an account?
            <br />
            <v-btn
              color="#0081a7"
              rounded
              :to="{
                name: 'register',
              }"
              >Create Account</v-btn
            >
          </p>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
