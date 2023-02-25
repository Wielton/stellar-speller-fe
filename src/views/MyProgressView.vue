<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";
import { useWordStore } from "../stores/words";
import WordCard from "../components/WordCard.vue";

const { getAllAnswers } = useAnswerStore();
const { getUserWords } = useWordStore();
const { joinedAnswersAndWords } = storeToRefs(useAnswerStore());
onMounted(async () => {
  await getUserWords();
  await getAllAnswers();
});
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <!-- Add UI popup as <slot></slot> to get user stats like success rate and definition when clicked
              Have a star rated element where each 10% = 1/2 a star with a total of 5 stars for 100%
        -->

      <!-- {{ group.groupId }} -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        v-for="word in joinedAnswersAndWords"
        :key="word.wordId"
      >
        <word-card :word="word"></word-card>
      </v-col>
    </v-row>
  </v-container>
</template>
