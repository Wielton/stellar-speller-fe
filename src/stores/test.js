import { defineStore } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";


// Add a usage sentence or word description
//  so
export const useTestStore = defineStore("tests", {
    state: () => ({
        testWords: [],
    }),
    getters: {
        // create a getter for the wordsToAdd(state) to update when a word is added to it
    },
    actions: {
        
        async getTestWords(){
            await axios.request({
                url: import.meta.env.VITE_API_URL+"tests",
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