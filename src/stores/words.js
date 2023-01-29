import { defineStore } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";


// Add a usage sentence or word description
//  so
export const useWordStore = defineStore("words", {
    state: () => ({
        userWords: [],
        wordsToAdd: [],
        wordInfo: null,
        successMessage: null,
        errMessage: null
    }),
    getters: {
        // create a getter for the wordsToAdd(state) to update when a word is added to it
    },
    actions: {
        async getDefinition(word){
            const stringWord = word.toString()
            await axios.request({
                url: "https://api.dictionaryapi.dev/api/v2/entries/en/"+stringWord,
                method: "GET",
            }).then((response)=>{
                console.log(response.data)
                this.wordInfo = response.data[0]
            }).catch((error)=>{
                this.errorResponse = error.response.data.title
            })
        },
        addWordToGroup(word) {
            if (this.wordsToAdd.length <= 6) {
                this.wordsToAdd.push(word);
            }
            },
        async addWordsToDatabase(words){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"words",
                method: "POST",
                params: {
                    "sessionToken": cookies.get("sessionToken")
                },
                data: {
                    words
                }
            }).then((response) => {
                this.wordsToAdd = []
                this.successMessage = response.data
            }).catch((error)=>{
                this.errMessage = error.response
            })
        },
        async getUserWords(){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"words",
                method: "GET",
                params: {
                    "sessionToken": cookies.get("sessionToken")
                }
            }).then((response) => {
                console.log(response.data)
                this.userWords = response.data
            }).catch((err) => {
                this.errMessage = err
            })
        }
    }
});


