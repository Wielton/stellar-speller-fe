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
        currentWords: [
            {
                groupId: null,
                word: null,
                wordId: null,
                answer: null,
            },
        ],
        pastWords: [
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
            if(arr.length <= 2) {
                return arr;
            }else if(arr.length >= 3 && arr.length <= 10) {
                const ranWords = [];
                for(let i = 0; i < arr.length; i++) {
                    const ranIndex = Math.floor(Math.random() * arr.length);
                    ranWords.push(arr[ranIndex]);
                    arr.pop(arr[ranIndex])
                }
                return ranWords;
            }
            
        },
        // Create a function to filter userWords
        currentTestWords() {
            // const { weakWords } = useAnswerStore();
            const { userWords } = useWordStore();
            // const extraWords = this.getRandomWeakWords(weakWords)
            // Get words from words.js
            // Get the last element in the array
            const lastElement = userWords[userWords.length - 1];
            // Get the lastElement.groupId
            const lastElementGroupId = lastElement.groupId;
            // Get all elements from userWords that match the groupId by filter
            this.currentWords = userWords.filter(
                (word) => word.groupId == lastElementGroupId
            );
            // this.testWords += extraWords
        },
        pastTestWords(id) {
            const { userWords } = useWordStore();
            this.pastWords = userWords.filter(
                (word) => word.groupId == id
            );
            console.log("Past words: " ,this.pastWords);
        },
        randomTestWords() {

        },
        fullTest() {
        
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
