<script setup>
// import { storeToRefs } from "pinia";
// import { useWordStore } from "../stores/words";

// const wordStore = useWordStore();
// const { userWords } = storeToRefs(wordStore);

// The test list will be fetched from the /api/test endpoint and will grab the last group_id and all joined words
</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Test List from current week -->
        <h2>Test Words</h2>
      </v-col>
      <v-col>
        <!-- Inputs matching test word -->
        <h2>Answers</h2>
      </v-col>
    </v-row>
  </v-container>
</template>
