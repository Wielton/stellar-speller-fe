<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useWordStore } from "../stores/words";

const wordStore = useWordStore();
const { wordsToAdd } = storeToRefs(wordStore);
const { addWordsToDatabase } = wordStore;
const word = ref("");
// Do I create a computed(()=>{}) function to update the wordsToAdd(state) when a word is added or use a getter?
// This function adds the current word to the payload
function addWord(item) {
  wordStore.addWordToGroup(item);
  word.value = "";
}
function submitWordGroup(wordsToAdd) {
  addWordsToDatabase(wordsToAdd);
}
</script>
<!-- 
  - @click addNewWeek() will create a new "week" or group of words
    and reveal a v-text-field with an append-icon "+"
  - When the user clicks the "+" icon, the word will be saved in the store state newWords: [], *use storeToRefs()*
    the text-field disappears, and the word renders in place of it
  - A question will appear below to ask if want to add another word
    - if no, user will be asked to verify these are the words to add,
      the user clicks yes to verify, the words are sent as an array to the backend
    - if yes, 
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="word in wordsToAdd" :key="word.index" :word="word">
        <!-- This is a sidebar column -->
        {{ word }}
      </v-col>
      <v-col>
        <v-btn
          v-if="wordsToAdd.length === 6"
          class="btn"
          rounded
          @click="submitWordGroup(wordsToAdd)"
          >SUBMIT</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form ref="form" lazy-validation v-if="wordsToAdd.length <= 5">
          <v-text-field
            label="Add a new word..."
            hide-details="auto"
            v-model="word"
          ></v-text-field>
          <v-btn rounded @click="addWord(word)"> ADD </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="css">
.btn {
  background-color: #282828;
  color: #fafafa;
}
</style>
