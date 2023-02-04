import { defineStore } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";
import { useWordStore } from "./words";


export const useAnswerStore = defineStore("answers", {
    
    state: () => ({
        allAnswers: [],
        strongestWords: [],
        weakestWords: [],
        errMessage: null
    }),
    getters: {
        // create a getter for the wordsToAdd(state) to update when a word is added to it
    },
    actions: {
        
        async getAllAnswers(){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"answers",
                method: "GET",
                params: {
                    "sessionToken": cookies.get("sessionToken")
                }
            }).then((response) => {
                console.log(response.data)
                this.allAnswers = response.data
            }).catch((err) => {
                this.errMessage = err
            })
        },
        filterAnswers(){
            // This function will calculate all answers into correct or wrong arrays
            // 
            // STEPS:
            //  1. Use allAnswers and userWords
            const { userWords } = useWordStore()
            //  2. Use empty arrays of objects: correctAnswers and wrongAnswers
            const correctAnswers = []
            const wrongAnswers = []

            //  3. Check if the answer is correct(by matching with the word from userWords)
            // for(words in userWords){
            //     for (answer in this.allAnswers){
            //         
            // }
            // }
            // push to correctAnswers, else push to wrongAnswers

        },
        filterWeakWords(){

        }
    }
});