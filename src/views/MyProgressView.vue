<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";
import { useWordStore } from "../stores/words";
import WordCard from "../components/WordCard.vue";

const { getAllAnswers, groupedArray } = useAnswerStore();
const { getUserWords } = useWordStore();
const { userWords } = storeToRefs(useWordStore());
const { joinedAnswersAndWords, wordGroups } = storeToRefs(useAnswerStore());

onMounted(async () => {
  await getUserWords();
  await getAllAnswers();
  groupedArray();
  console.log("Word store: ", userWords.value);
  console.log("Answer store: ", joinedAnswersAndWords.value);
});

function groupNum(num) {
  return num + 1;
}
</script>
<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(group, idx) in wordGroups"
      :key="idx"
      :group="group"
      ><v-expansion-panel-title>
        <v-row align="center" justify="start">
          <v-cols cols="12" class="d-flex"
            ><span class="text-p pa-2 text-indigo">
              Group: {{ groupNum(idx) }}
            </span></v-cols
          ></v-row
        >
      </v-expansion-panel-title>
      <v-expansion-panel-text
        ><v-row align="center" justify="center">
          <!-- Add UI popup as <slot></slot> to get user stats like success rate and definition when clicked
                Have a star rated element where each 10% = 1/2 a star with a total of 5 stars for 100%
          -->

          <!-- {{ group.groupId }} -->
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="4"
            v-for="word in group"
            :key="word.wordId"
          >
            <word-card :word="word"></word-card>
          </v-col> </v-row
      ></v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
