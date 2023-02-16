<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "../stores/test";

// The test list will be fetched from the /api/test endpoint and will grab the last group_id and all joined words
const { testWords, answersToAdd } = storeToRefs(useTestStore());
const { filterTestWords, addWordToGroup, submitAnswers } = useTestStore();
onMounted(() => {
  if (testWords.length >= 1) {
    filterTestWords();
  }
});
// Create a function to filter out the answer and the wordId it is associated with

// Dynamically rendered test words with the original wordId linked to it for axios POST
// Make a test form component in the hopes it will render each testWord as its own component
// Hopefully this will enable each component to disappear when that testWord is answered.
// Currently, all "ADD" buttons hide after the first answered in added
</script>
<template>
  <v-container fluid>
    <v-row v-show="answersToAdd.length" align="center" justify="center">
      <v-col
        cols="4"
        v-for="answer in answersToAdd"
        :key="answer.wordId"
        :answer="answer"
      >
        <v-card solo>
          <v-card-title>{{ answer.word }}</v-card-title>
        </v-card>
      </v-col>

      <v-btn
        v-show="answersToAdd.length >= 1"
        @click="submitAnswers()"
        :color="testWords.length == 0 ? 'green' : 'red'"
        >SUBMIT</v-btn
      >
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center" justify="center">
        <!-- Test List from current week -->

        <v-list
          v-if="testWords.length"
          bg-color="#667bc7ff"
          color="#89acd2ff"
          rounded
          class="pa-6"
          density="compact"
          lines="one"
        >
          <v-list-item
            v-for="word in testWords"
            :key="word.wordId"
            :word="word"
            rounded
            density="compact"
            elevation="8"
            class="pa-6"
          >
            <v-card outlined rounded width="90%">
              <v-card-title>{{ word.word }}</v-card-title>
              <v-text-field
                rounded
                append-icon="mdi-plus"
                @click:append="addWordToGroup(word.answer, word.wordId)"
                v-model="word.answer"
                placeholder="Answer?"
              ></v-text-field>
            </v-card>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
