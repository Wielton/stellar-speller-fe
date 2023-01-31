<script setup>
import { storeToRefs } from "pinia";
import { useTestStore } from "../stores/test";

// The test list will be fetched from the /api/test endpoint and will grab the last group_id and all joined words
const { testWords } = useTestStore();
const { answerFields } = storeToRefs(useTestStore);
</script>
<template>
  <v-container fluid>
    <v-row align-center justify-center>
      <v-col cols="6">
        <!-- Test List from current week -->
        <v-sheet elevation="12">
          <v-list>
            <v-list-item v-for="word in testWords" :key="word.wordId" :word="word">
              <v-list-item-title v-html="word.word"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <!-- Inputs matching test word -->
        <v-sheet elevation="12">
          <!-- The answerId will be the wordId which I attach to it during payload build for axios POST -->
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
