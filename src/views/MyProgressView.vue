<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";
import { useWordStore } from "../stores/words";
import WordCard from "../components/WordCard.vue";

const { getAllAnswers } = useAnswerStore();
const { getUserWords } = useWordStore();
const { userWords } = storeToRefs(useWordStore());
const { joinedAnswersAndWords } = storeToRefs(useAnswerStore());

// const allWords = joinedAnswersAndWords.value;
// const groupedArray = allWords.reduce((acc, cur) => {
//   const index = acc.findIndex((group) => group[0]?.groupId === cur.groupId);
//   if (index === -1) {
//     acc.push([cur]);
//   } else {
//     acc[index].push(cur);
//   }
//   return acc;
// }, []);

// function GetWordGroups(arr) {
//   // Create empty wordGroups[] to hold groups of words according to groupId
//   const words = arr;
//   console.log("Original array 1st element: ", words);
//   const wordGroups = [];
//   const wordGroup = [];
//   // Iterate through function variable arr
//   for (let i = 0; i < words.length; i++) {
//     // Create wordGroup[] to hold a group of words according to groupId

//     // If wordGroup is empty
//     if (wordGroup.length == 0) {
//       // Push the first element from words
//       wordGroup.push(words[0]);
//       console.log(
//         "First element from words pushed to wordGroup array: ",
//         wordGroup
//       );
//     } else if (
//       wordGroup[0].wordId != words[i].wordId &&
//       wordGroup[0].groupId == words[i].groupId
//     ) {
//       // Push the arr element into wordGroup
//       wordGroup.push(words[i]);
//       console.log(
//         "Element from words pushed to wordGroup array: ",
//         words[i],
//         wordGroup
//       );
//     }
//     wordGroups.push(wordGroup);
//   }

//   return wordGroups;
// }
onMounted(async () => {
  await getUserWords();
  await getAllAnswers();
  console.log("Word store: ", userWords.value);
  console.log("Answer store: ", joinedAnswersAndWords.value);
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
