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
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="6" lg="6">
        <div class="text-center text-subtitle-1 text-indigo-lighten-1">
          Add new words:
        </div>
        <v-form ref="form" v-if="wordsToAdd.length <= 5">
          <v-text-field
            variant="solo"
            label="Add a new word..."
            bg-color="indigo-lighten-5"
            color="indigo-darken-2"
            v-model="word"
            ><template v-slot:append
              ><v-icon
                @click="addWord(word)"
                icon="mdi-plus"
                color="indigo-lighten-5"
              ></v-icon></template
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col v-if="wordsToAdd.length" cols="12" sm="6" md="6" lg="6">
        <v-list
          bg-color="#667bc7ff"
          color="#89acd2ff"
          rounded
          class="pa-2"
          min-height="250px"
          density="compact"
        >
          <v-toolbar color="transparent">
            <v-toolbar-title color="indigo-lighten-2"
              >Words to add:</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              v-if="wordsToAdd.length >= 1"
              size="medium"
              icon="mdi-plus"
              flat
              @click="submitWordGroup(wordsToAdd)"
            ></v-btn>
          </v-toolbar>
          <v-list-item
            v-for="word in wordsToAdd"
            :key="word.index"
            :word="word"
            lines="one"
            density="compact"
          >
            {{ word }}
          </v-list-item>
        </v-list>
      </v-col>
      <v-col v-else>
        <div class="text-center text-subtitle-1 text-indigo-lighten-1">
          Your words to add will show up here
        </div>
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
