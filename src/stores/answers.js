/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";
import { useWordStore } from "./words";

export const useAnswerStore = defineStore("answers", {
    state: () => ({
        allAnswers: [],
        joinedAnswersAndWords: [],
        strongWords: [],
        weakWords: [],
        evenStrengthWords: [],
        errMessage: null,
    }),
    actions: {
        async getAllAnswers() {
            await axios
                .request({
                    url: import.meta.env.VITE_API_URL + "answers",
                    method: "GET",
                    params: {
                        sessionToken: cookies.get("sessionToken"),
                    },
                })
                .then((response) => {
                    const allAnswers = response.data;
                    this.allAnswers = allAnswers;
                    this.filterWords();
                })
                .catch((error) => {
                    this.errMessage = error;
                });
        },
        filterWords() {
            //     // This function will calculate all answers into correct or wrong arrays
            //     //
            //     // STEPS:
            //     //  1. Use allAnswers and userWords
            //     //  2. Use empty arrays of objects: correctAnswers and wrongAnswers
            const { userWords } = useWordStore();
            // Get all words in allAnswers where ogWordId == word.wordId
            this.joinedAnswersAndWords = []
            for (let i = 0; i < userWords.length; i++) {
                const word = {};
                word["wordId"] = userWords[i].wordId;
                word["word"] = userWords[i].word;
                word["correctAnswers"] = [];
                word["wrongAnswers"] = [];
                for (let j = 0; j < this.allAnswers.length; j++) {
                    if (
                        userWords[i].wordId == this.allAnswers[j].ogWordId &&
                        userWords[i].word == this.allAnswers[j].word
                    ) {
                        word.correctAnswers.push(this.allAnswers[j].word);
                    } else if (
                        userWords[i].wordId == this.allAnswers[j].ogWordId &&
                        userWords[i].word != this.allAnswers[j].word
                    ) {
                        word.wrongAnswers.push(this.allAnswers[j].word);
                    }
                }
                this.joinedAnswersAndWords.push(word);
            }
        },
        filterStrongAndWeakWords() {
            this.strongWords = []
            this.weakWords = []
            this.evenStrengthWords = []
            this.strongWords = this.joinedAnswersAndWords.filter(
                (word) => word.correctAnswers.length > word.wrongAnswers.length
            );
            this.weakWords = this.joinedAnswersAndWords.filter(
                (word) => word.wrongAnswers.length > word.correctAnswers.length
            );
            this.evenStrengthWords = this.joinedAnswersAndWords.filter(
                (word) => word.correctAnswers.length == word.wrongAnswers.length
            );
            }
        // if(correctAnswers.length > wrongAnswers.length){
        //     this.strongestWords
        // }
        // 4. Count total amount of words in correctAnswers that match
        //    and do the same with wrongAnswers
        // 5. If more in correctAnswers, push word to this.strongestWords
        // 6. Else if more in wrongAnswers, push word to this.weakestWords
    },
});
