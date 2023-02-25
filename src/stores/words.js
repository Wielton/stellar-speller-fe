/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";

// Add a usage sentence or word description
//  so
export const useWordStore = defineStore("words", {
    state: () => ({
        userWords: [],
        wordsToAdd: [],
        // wordGroups: [{
        //     groupId: null,
        //     words: [{
        //         word: null,
        //         wordId: null
        //     }]
        // }],
        wordInfo: null,
        successMessage: null,
        errMessage: null,
    }),
    getters: {
        // create a getter for the  to update when a word is added to it
        
    },
    actions: {
        // filterWordGroups(){
        //     // get the groupId of all userWords
        //     // for all matching groupId words
        //     // push the groupId
        //     // const groups = []
        //     for(let i = 0; i < userWords.length; i++){
        //         console.log(userWords[i].groupId)
        //     }
        // },
        // Get word info from dictionary API
        getDefinition(word) {
            const stringWord = word.toString();
            axios
                .request({
                    url: "https://api.dictionaryapi.dev/api/v2/entries/en/" + stringWord,
                    method: "GET",
                })
                .then((response) => {
                    console.log(response.data);
                    this.wordInfo = response.data;
                })
                .catch((error) => {
                    this.errorResponse = error.response.data.title;
                });
        },
        // Add word to payload
        // To be used in AddWords and Test Views
        addWordToGroup(word) {
            if (this.wordsToAdd.length <= 6) {
                this.wordsToAdd.push(word);
            }
        },

        addWordsToDatabase(words) {
            axios
                .request({
                    url: import.meta.env.VITE_API_URL + "words",
                    method: "POST",
                    params: {
                        sessionToken: cookies.get("sessionToken"),
                    },
                    data: {
                        words,
                    },
                })
                .then((response) => {
                    console.log(response);
                    this.wordsToAdd = [];
                    router.push({ name: "user" });
                })
                .catch((error) => {
                    this.errMessage = error.response;
                });
        },
        async getUserWords() {
            this.userWords = [];
            await axios
                .request({
                    url: import.meta.env.VITE_API_URL + "words",
                    method: "GET",
                    params: {
                        sessionToken: cookies.get("sessionToken"),
                    },
                })
                .then((response) => {
                    
                    this.userWords = response.data;
                })
                .catch((err) => {
                    this.errMessage = err;
                });
        },
    },
});
