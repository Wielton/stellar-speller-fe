<script setup>
import { storeToRefs } from "pinia";
import { useWordStore } from "../stores/words";

const wordStore = useWordStore();
const { userWords } = storeToRefs(wordStore);
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn v-for="word in userWords" :key="word.wordId">{{ word.word }}</v-btn>
        <!-- Add UI popup as <slot></slot> to get user stats like success rate and definition when clicked
              Have a star rated element where each 10% = 1/2 a star with a total of 5 stars for 100%
        -->
      </v-col>
    </v-row>
  </v-container>
</template>
