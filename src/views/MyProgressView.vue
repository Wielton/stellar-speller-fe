<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";
import { useWordStore } from "../stores/words";
import WordCard from "../components/WordCard.vue";

const { getAllAnswers } = useAnswerStore();
const { getUserWords } = useWordStore();
const { joinedAnswersAndWords } = storeToRefs(useAnswerStore());

const allWords = joinedAnswersAndWords;
function GetWordGroups(arr) {
  // Create empty wordGroups[] to hold groups of words according to groupId
  const words = arr;
  console.log("Original array 1st element: ", words[0]);
  const wordGroups = [];
  // Create wordGroup[] to hold a group of words according to groupId
  const wordGroup = [];
  // Iterate through function variable arr
  for (let i = 0; i < words.length; i++) {
    // If wordGroup is empty
    if (wordGroup.length < 0) {
      // Push the first element from words
      wordGroup.push(words[i]);
      console.log(
        "First element from words pushed to wordGroup array: ",
        wordGroup
      );
    }

    // Set conditional if the first element groupId in wordGroup[] == the next element groupId in arr[]
    // And the wordGroup.word != to arr.word
    else if (
      wordGroup[0].groupId == words[i].groupId &&
      wordGroup[0].wordId != words[i].wordId
    ) {
      // Push the arr element into wordGroup
      wordGroup.push(words[i]);
      console.log(
        "Element from words pushed to wordGroup array: ",
        words[i],
        wordGroup
      );
    } else if (
      wordGroup.length != 0 &&
      words.length != 0 &&
      wordGroup[0].groupId != words[i].groupId
    ) {
      wordGroups.push(wordGroup);
      this.wordGroup = [];
    }
  }
  return wordGroups;
}
onMounted(async () => {
  await getUserWords();
  await getAllAnswers();
  const groups = GetWordGroups(allWords.value);
  console.log(groups);
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
