<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useWordStore } from "../stores/words";
import { useAnswerStore } from "../stores/answers";

const { userWords } = storeToRefs(useWordStore());
const answerStore = useAnswerStore();
const { getAllAnswers } = answerStore;
// onUpdated(() => {
// this.getUserWords()
// })
// const wordGroups = computed(() => {});
onMounted(() => {
  getAllAnswers();
});
</script>
<template>
  <v-container fluid>
    <v-row align-center justify-center>
      <v-col cols="4">
        <!-- Add UI popup as <slot></slot> to get user stats like success rate and definition when clicked
              Have a star rated element where each 10% = 1/2 a star with a total of 5 stars for 100%
        -->
        <h3>Your Words:</h3>
      </v-col>
      <v-col cols="8">
        <v-list dense max-height="300" background-color="inherit">
          <!-- {{ group.groupId }} -->
          <v-list-item outlined v-for="word in userWords" :key="word.wordId" :word="word">
            <v-btn flat>
              {{ word.word }}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
