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
                this.filterAnswers(this.allAnswers)
            }).catch((error) => {
                this.errMessage = error
            })
        },
        filterAnswers(){
        //     // This function will calculate all answers into correct or wrong arrays
        //     // 
        //     // STEPS:
        //     //  1. Use allAnswers and userWords
        //     //  2. Use empty arrays of objects: correctAnswers and wrongAnswers
            const { userWords } = useWordStore()         
            const correctAnswers = []
            const wrongAnswers = []
            
            for(let i = 0; i < this.allAnswers.length;i++){
                for(let j = 0;j < userWords.length; j++){
                    
                    //  3. Check if the answer is correct(by matching with the word from userWords)
                    if(userWords[j].word == this.allAnswers[i].word && userWords[j].wordId == this.allAnswers[i].ogWordId){
                        // push to correctAnswers
                        correctAnswers.push(this.allAnswers[i])
                        
                    }else if(userWords[j].word != this.allAnswers[i].word && userWords[j].wordId == this.allAnswers[i].ogWordId){
                        //  else push to wrongAnswers
                        wrongAnswers.push(this.allAnswers[i])
}
                } 
            }
            console.log("Correct Answers: ", correctAnswers)
            console.log("Wrong Answers: ", wrongAnswers)
            // 4. Count total amount of words in correctAnswers that match
            //    and do the same with wrongAnswers
            // 5. If more in correctAnswers, push word to this.strongestWords
            // 6. Else if more in wrongAnswers, push word to this.weakestWords
        }

        // },
        // filterWeakWords(){

        // }
    }
});