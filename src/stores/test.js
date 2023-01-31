import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";
import { useWordStore } from "./words";



// Add a usage sentence or word description
//  so
export const useTestStore = defineStore("test", {
    state: () => ({
        testWords: [],
        wordGroups: [],
        // answerFields: [
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        //     { answer: "", word: this.testWords.word, id: this.testWords.wordId},
        // ],
        answersToAdd: [],
        successMessage: null,
        errMessage: null
    }),
    getters: {
        // create a getter for the wordsToAdd(state) to update when a word is added to it
    },
    actions: {
        
        // Create a function to filter userWords
        filterTestWords(){
            const { userWords } = useWordStore();
            // Get words from words.js
            // Get the last element in the array
            const lastElement = userWords[userWords.length - 1];
            console.log(lastElement);
            // Get the lastElement.groupId
            const lastElementGroupId = lastElement.groupId;
            console.log(lastElementGroupId);
            // Get all elements from userWords that match the groupId by filter
            this.testWords = userWords.filter(word => word.groupId == lastElementGroupId);
            
        },
        
        
        // This function is in words.js
        addWordToGroup(word) {
            if (this.answersToAdd.length <= 6) {
                this.answersToAdd.push(word);
            }
            },
        

        // 
        async addAnswersToDatabase(words){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"answers",
                method: "POST",
                params: {
                    "sessionToken": cookies.get("sessionToken")
                },
                data: {
                    words
                }
            }).then((response) => {
                this.answersToAdd = []
                this.successMessage = response.data
            }).catch((error)=>{
                this.errMessage = error.response
            })
        },
        
    }
});