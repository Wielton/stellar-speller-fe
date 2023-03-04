<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user";
import { useWordStore } from "../stores/words";
import { useAnswerStore } from "../stores/answers";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiStarOutline } from "@mdi/js";

const { logout } = useUserStore();
const { user } = storeToRefs(useUserStore());
const wordStore = useWordStore();
const answerStore = useAnswerStore();
const starOutline = mdiStarOutline;

onMounted(() => {
  console.log(user.value);
  console.log("Word store: ", wordStore.userWords);
  console.log("Answer store: ", answerStore.joinedAnswersAndWords);
});
</script>

<template>
  <v-container fluid class="home-page fill-height" app>
    <v-row align="center" justify="center">
      <v-col cols="12" class="pa-2 ma-0">
        <div
          class="font-weight-bold text-center home-title text-h4 text-sm-h3 text-md-h2 text-lg-h1 text-indigo-lighten-1"
        >
          <span
            ><svg-icon
              class="star-icon-1"
              type="mdi"
              :path="starOutline"
            ></svg-icon></span
          >Stellar Speller<span
            ><svg-icon
              class="star-icon-2"
              type="mdi"
              :path="starOutline"
            ></svg-icon
          ></span>
        </div>
        <div class="text-center text-subtitle-1 text-indigo-lighten-1">
          Track your progress and perfect your spelling!
        </div>
      </v-col>
      <v-col cols="12" v-if="!user.userId" class="d-flex justify-space-around">
        <v-btn flat color="indigo-lighten-2" :to="{ name: 'login' }"
          >Login</v-btn
        >
      </v-col>
      <v-col cols="12" v-else class="d-flex justify-space-between">
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="indigo-lighten-2"
          :to="{ name: 'user', params: { userId: user.userId } }"
        >
          HOME
        </v-btn>
        <v-btn flat color="indigo-lighten-2" @click="logout()">Logout</v-btn>
        <v-spacer></v-spacer>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="css" scoped>
.home-main {
  height: 75vh;
}
.home-page {
  background-size: cover;
  height: 100%;
  width: 100%;
}
.star-icon-1,
.star-icon-2 {
  color: #fff176;
  width: 50px;
  height: 50px;
}
.star-icon-1 {
  rotate: 45deg;
}
.star-icon-2 {
  rotate: 90deg;
}
@media screen and (min-width: 500px) {
  .star-icon {
    width: 75px;
    height: 75px;
  }
}
</style>
