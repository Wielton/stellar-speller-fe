<script setup>
// import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useWordStore } from "../stores/words";

const { userWords } = storeToRefs(useWordStore());
// onUpdated(() => {
// this.getUserWords()
// })
// const wordGroups = computed(() => {});
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
        <v-list dense max-height="300" color="#284b63">
          <!-- {{ group.groupId }} -->
          <v-list-item outlined v-for="word in userWords" :key="word.wordId">
            {{ word.word }}
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
