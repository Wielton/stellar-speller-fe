<script setup>
defineProps({
  joinedAnswersAndWords: Array,
  strongWords: Array,
  weakWords: Array,
});
</script>
<template>
  <v-card
    color="#89acd2ff"
    rounded
    v-for="word in joinedAnswersAndWords"
    :key="word.wordId"
    :word="word"
  >
    <v-card-title
      :class="
        strongWords.includes(word)
          ? 'strong-word-title'
          : weakWords.includes(word)
          ? 'weak-word-title'
          : 'avg-word-title'
      "
      >{{ word.word }}
    </v-card-title>
    <v-row align="center" justify="center">
      <v-col v-if="word.correctAnswers.length" cols="6"
        ><v-card-subtitle class="card-subtitle"
          >Correct Answers</v-card-subtitle
        >
        <v-divider></v-divider>
        <v-card-text
          class="card-text"
          v-for="(correctAnswer, index) in word.correctAnswers"
          :key="index"
          :correctAnswer="correctAnswer"
          >{{ correctAnswer }}</v-card-text
        >
      </v-col>
      <v-col v-if="word.wrongAnswers.length" cols="6"
        ><v-card-subtitle class="card-subtitle">Wrong Answers</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text
          class="card-text"
          v-for="(wrongAnswer, index) in word.wrongAnswers"
          :key="index"
          :wrongAnswer="wrongAnswer"
          >{{ wrongAnswer }}</v-card-text
        >
      </v-col>
      <v-col
        cols="12"
        v-if="!word.correctAnswers.length && !word.wrongAnswers.length"
      >
        <v-card-text class="card-text"> Not answered yet </v-card-text>
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
  color: #f4f1f1ff;
}
.page-title {
  color: #89acd2ff;
}
.strong-word-title {
  background-color: rgba(51, 179, 51, 0.489);
}
.weak-word-title {
  background-color: rgba(152, 35, 35, 0.655);
}
.avg-word-title {
  background-color: rgba(96, 131, 201, 0.47);
}
</style>
