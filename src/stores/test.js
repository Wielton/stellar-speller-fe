import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import cookies from "vue-cookies";
import { useWordStore } from "./words";




// Add a usage sentence or word description
//  so
export const useTestStore = defineStore("test", {
    
    state: () => ({
        testWords: [{
            groupId: null,
            word: null,
            wordId: null,
            answer: null,
        }],
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
        addWordToGroup(word, wordId) {
            const wordData = {
                word: null,
                wordId: null
            }
                wordData.word = word
                wordData.wordId = wordId
                this.answersToAdd.push(wordData)
                this.testWords = this.testWords.filter(word => word.answer != wordData.word);
                console.log(this.answersToAdd)
            },
            removeWordFromGroup(item){
                this.answersToAdd.slice(item)
            },
        

        // 
        async submitAnswers(){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"answers",
                method: "POST",
                params: {
                    "sessionToken": cookies.get("sessionToken")
                },
                data: {
                    words: this.answersToAdd
                }
            }).then((response) => {
                this.answersToAdd = []
                this.successMessage = response
                router.push({name: "user"})
            }).catch((error)=>{
                this.errMessage = error.response
            })
        },
        
    }
});