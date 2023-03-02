<script setup>
import { onMounted, onUpdated } from "vue";
import { storeToRefs } from "pinia";
import { useAnswerStore } from "../stores/answers";

const { filterStrongAndWeakWords } = useAnswerStore();
const { strongWords, weakWords } = storeToRefs(useAnswerStore());
onMounted(() => {
  filterStrongAndWeakWords();
});
onUpdated(() => {
  filterStrongAndWeakWords();
});
defineProps({
  word: Object,
});
</script>
<template>
  <v-card color="#c5cae9" rounded>
    <v-card-title
      class="d-flex justify-space-around"
      :class="
        strongWords.includes(word)
          ? 'strong-word-title'
          : weakWords.includes(word)
          ? 'weak-word-title'
          : 'avg-word-title'
      "
    >
      {{ word.word }}
    </v-card-title>
    <v-row align="center" justify="center">
      <v-col cols="6"
        ><v-card-subtitle
          class="text-indigo-lighten-1 font-weight-bold d-flex justify-center"
          >Correct</v-card-subtitle
        >
        <v-divider color="#5c6bc0"></v-divider>
        <v-card-text
          class="text-indigo-lighten-2 d-flex justify-center"
          v-for="(correctAnswer, idx) in word.correctAnswers"
          :key="idx"
          :correctAnswer="correctAnswer"
          >{{ correctAnswer }}</v-card-text
        >
      </v-col>
      <v-col cols="6"
        ><v-card-subtitle
          class="text-indigo-lighten-1 font-weight-bold d-flex justify-center"
          >Wrong</v-card-subtitle
        >
        <v-divider color="#5c6bc0"></v-divider>
        <v-card-text
          class="text-indigo-lighten-2 d-flex justify-center"
          v-for="(wrongAnswer, idx) in word.wrongAnswers"
          :key="idx"
          :wrongAnswer="wrongAnswer"
          >{{ wrongAnswer }}</v-card-text
        >
      </v-col>
      <v-col
        cols="12"
        v-if="!word.correctAnswers.length && !word.wrongAnswers.length"
      >
        <v-card-text class="text-indigo-lighten-1">
          Not answered yet
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>
<style lang="css" scoped>
.strong-word-title,
.weak-word-title,
.avg-word-title,
.card-subtitle,
.card-text {
  color: whitesmoke;
}
.page-title {
  color: #89acd2ff;
}
.strong-word-title {
  background-color: #4db6ac;
}
.weak-word-title {
  background-color: #e57373;
}
.avg-word-title {
  background-color: #7986cb;
}
</style>
