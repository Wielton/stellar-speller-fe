<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "../stores/test";
import { useWordStore } from "../stores/words";
import { useAnswerStore } from "../stores/answers";

// The test list will be fetched from the /api/test endpoint and will grab the last group_id and all joined words
const { currentWords, answersToAdd } = storeToRefs(useTestStore());
const { currentTestWords, pastTestWords, addWordToGroup, submitAnswers } =
  useTestStore();
const { userWords } = storeToRefs(useWordStore());
const { wordGroups, getCurrentTestWords } = storeToRefs(useAnswerStore());
onMounted(async () => {
  console.log(userWords.value);
  if (userWords.value) {
    currentTestWords();
    sortWords(answersToAdd, currentWords);
  }
});
function addWord(word, wordId) {
  addWordToGroup(word, wordId);
}
function submitWordGroup() {
  submitAnswers();
}
function removeWord(arr, item) {
  arr.pop(item);
}
function sortWords(arr1, arr2) {
  if (arr1.length >= 1) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i].wordId == arr2[j].wordId) {
          arr2.pop(arr2[j]);
        }
      }
    }
  }
}
// Create a function to filter out the answer and the wordId it is associated with

// Dynamically rendered test words with the original wordId linked to it for axios POST
// Make a test form component in the hopes it will render each testWord as its own component
// Hopefully this will enable each component to disappear when that testWord is answered.
// Currently, all "ADD" buttons hide after the first answered in added
</script>
<template>
  <v-container fluid class="fill-height">
    <v-row v-if="!currentWords">
      <v-col cols="12"><h1>Your test words will show up here</h1></v-col>
    </v-row>
    <v-row align="center" justify="center" v-else>
      <v-col cols="12" sm="8" md="6" lg="6">
        <!-- Test List from current week -->
        <v-btn
          v-for="(group, idx) in wordGroups"
          :key="idx"
          @click="pastTestWords(group[idx].groupId)"
          >Past</v-btn
        >
        <v-list
          bg-color="transparent"
          rounded
          class="pa-1"
          density="compact"
          max-width="500px"
        >
          <v-list-item
            v-for="word in currentWords"
            :key="word.wordId"
            :word="word"
            rounded
            density="compact"
            class="pa-2"
          >
            <div class="text-h5 text-indigo-lighten-1 d-flex justify-start">
              {{ word.word }}
            </div>
            <v-text-field
              variant="solo"
              bg-color="indigo-lighten-5"
              color="indigo-darken-2"
              v-model="word.answer"
              placeholder="Answer?"
              clearable
            >
              <template v-slot:append
                ><v-icon
                  @click="
                    addWord(word.answer, word.wordId);
                    word.answer = '';
                  "
                  icon="mdi-plus"
                  color="indigo-lighten-5"
                ></v-icon
              ></template>
            </v-text-field>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" sm="4" md="6" lg="6">
        <v-list v-show="answersToAdd.length" bg-color="transparent">
          <v-list-item
            v-for="answer in answersToAdd"
            :key="answer.wordId"
            :answer="answer"
          >
            <div class="text-h5 text-indigo-darken-1">
              {{ answer.word }}
              <v-icon
                icon="mdi-minus"
                @click="removeWord(answersToAdd, answer)"
              ></v-icon></div
          ></v-list-item>
          <v-btn
            v-show="answersToAdd.length >= 1"
            @click="submitWordGroup()"
            :color="
              currentWords.length == 0 ? 'indigo-darken-1' : 'indigo-lighten-4'
            "
            >SUBMIT</v-btn
          >
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
