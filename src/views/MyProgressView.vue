<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";
import { useWordStore } from "../stores/words";
import WordCard from "../components/WordCard.vue";

const { getAllAnswers } = useAnswerStore();
const { getUserWords } = useWordStore();
const { filterStrongAndWeakWords } = useAnswerStore();
const { joinedAnswersAndWords, strongWords, weakWords } = storeToRefs(
  useAnswerStore()
);
onMounted(async () => {
  await getUserWords();
  await getAllAnswers();
  filterStrongAndWeakWords();
});
</script>
<template>
  <v-container fluid fill-height app id="progress">
    <v-row align="center" justify="center">
      <v-col cols="12" align="center" justify="center">
        <!-- Add UI popup as <slot></slot> to get user stats like success rate and definition when clicked
              Have a star rated element where each 10% = 1/2 a star with a total of 5 stars for 100%
        -->
        <v-card elevation="6" max-width="50%" rounded
          ><h3 class="page-title">Your Words:</h3></v-card
        >
      </v-col>
      <v-col cols="12" class="pa-0" justify="center" align="center">
        <!-- {{ group.groupId }} -->
        <v-list bg-color="#667bc7ff" color="#89acd2ff" rounded class="pa-6">
          <v-list-item elevation="8" class="pa-1">
            <word-card
              :joinedAnswersAndWords="joinedAnswersAndWords"
              :strongWords="strongWords"
              :weakWords="weakWords"
            ></word-card>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>
