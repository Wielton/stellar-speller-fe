/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";
import { useWordStore } from "./words";
// import { useAnswerStore } from "./answers";

// Add a usage sentence or word description
//  so
export const useTestStore = defineStore("test", {
    state: () => ({
        testWords: [
            {
                groupId: null,
                word: null,
                wordId: null,
                answer: null,
            },
        ],
        answersToAdd: [],
        strongerWords: [],
        weakerWords: [],
        successMessage: null,
        errMessage: null,
    }),
    getters: {
        // create a getter for the wordsToAdd(state) to update when a word is added to it
    },
    actions: {
        // Function to add a couple random weak words to the practice test module
        getRandomWeakWords(arr) {
            const ranIndex = Math.floor(Math.random() * arr.length);
            const item1 = arr[ranIndex];
            arr.pop(item1)
            return { item1 }
        },
        // Create a function to filter userWords
        async filterTestWords() {
            // const { weakWords } = useAnswerStore();
            const { userWords } = useWordStore();
            // const extraWords = this.getRandomWeakWords(weakWords)
            // Get words from words.js
            // Get the last element in the array
            const lastElement = userWords[userWords.length - 1];
            // Get the lastElement.groupId
            const lastElementGroupId = lastElement.groupId;
            // Get all elements from userWords that match the groupId by filter
            this.testWords = userWords.filter(
                (word) => word.groupId == lastElementGroupId
            );
            // this.testWords += extraWords
        },

        // This function is in words.js
        addWordToGroup(word, wordId) {
            const wordData = {
                word: null,
                wordId: null,
            };
            wordData.word = word;
            wordData.wordId = wordId;
            this.answersToAdd.push(wordData);
            this.testWords = this.testWords.filter(
                (word) => word.answer != wordData.word
            );
            console.log(this.answersToAdd);
        },
        // removeWordFromGroup(item){
        //     this.answersToAdd.slice(item)
        // },

        //
        async submitAnswers() {
            await axios
                .request({
                    url: import.meta.env.VITE_API_URL + "answers",
                    method: "POST",
                    params: {
                        sessionToken: cookies.get("sessionToken"),
                    },
                    data: {
                        words: this.answersToAdd,
                    },
                })
                .then((response) => {
                    this.answersToAdd = [];
                    this.successMessage = response;
                    router.push({ name: "user" });
                })
                .catch((error) => {
                    this.errMessage = error.response;
                });
        },
    },
});
