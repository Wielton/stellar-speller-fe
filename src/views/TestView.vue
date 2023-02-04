<script setup>
import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "../stores/test";

// The test list will be fetched from the /api/test endpoint and will grab the last group_id and all joined words
const { testWords, answersToAdd } = storeToRefs(useTestStore());
const {
  addWordToGroup,
  submitAnswers,
  removeWordFromGroup,
  filterTestWords,
} = useTestStore();
onBeforeMount(() => {
  filterTestWords();
});

// Create a function to filter out the answer and the wordId it is associated with

// Dynamically rendered test words with the original wordId linked to it for axios POST
// Make a test form component in the hopes it will render each testWord as its own component
// Hopefully this will enable each component to disappear when that testWord is answered.
// Currently, all "ADD" buttons hide after the first answered in added
</script>
<template>
  <v-container fluid>
    <v-row align-center justify-center>
      <v-col cols="6">
        <!-- Test List from current week -->
        <v-sheet elevation="12" max-width="300">
          <v-list v-if="testWords.length">
            <v-list-item solo v-for="word in testWords" :key="word.wordId" :word="word">
              <v-list-item-title>{{ word.word }}</v-list-item-title>
              <v-text-field
                append-icon="mdi-plus"
                @click:append="addWordToGroup(word.answer, word.wordId)"
                v-model="word.answer"
                placeholder="Answer?"
              ></v-text-field>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-sheet elevation="12">
          <v-list v-if="answersToAdd.length">
            <v-list-item
              solo
              v-for="answer in answersToAdd"
              :key="answer.wordId"
              :answer="answer"
              append-icon="mdi-minus"
              @click:append="removeWordFromGroup(answer)"
            >
              <v-list-item-title :answer="answer">{{ answer.word }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-btn v-if="answersToAdd.length == 6" @click="submitAnswers()">SUBMIT</v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
