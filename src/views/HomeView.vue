<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";

const { logout } = useUserStore();
const { user } = storeToRefs(useUserStore());
</script>

<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="12" lg="12" class="fill-height pa-6">
        <h1>Stellar Speller</h1>
        <h3>Track your progress and perfect your spelling!</h3>
        <!-- This is a hack-way of  -->
      </v-col>
      <v-col cols="12" v-if="user == null">
        <div>
          <v-btn :to="{ name: 'login' }">Login</v-btn>
        </div>
      </v-col>
      <v-col cols="12" v-else>
        <v-btn :to="{ name: 'user', params: { userId: user.userId } }">
          HOME
        </v-btn>
        <v-btn @click="logout()">Logout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
