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
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto" max-width="344" title="Stellar Speller">
          <v-container>
            <v-text-field
              v-model="loginForm.username"
              color="primary"
              label="Username"
              variant="underlined"
            ></v-text-field>

            <v-text-field
              v-model="loginForm.password"
              color="primary"
              label="Password"
              placeholder="Enter your password"
              variant="underlined"
            ></v-text-field>

            <!-- <v-checkbox
              v-model="terms"
              color="secondary"
              label="I agree to site terms and conditions"
            ></v-checkbox> -->
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="success" @click="login(loginForm.username, loginForm.password)">
              LOGIN
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
