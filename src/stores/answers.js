/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";
import axios from "axios";
import cookies from "vue-cookies";
import { useWordStore } from "./words";

export const useAnswerStore = defineStore("answers", {
    state: () => ({
        allAnswers: [],
        joinedAnswersAndWords: [],
        wordGroups: [],
        strongWords: [],
        weakWords: [],
        evenStrengthWords: [],
        errMessage: null,
    }),
    getters: {
        getCurrentTestWords: (state) => {
            return state.wordGroups[-1];
        },
        
    },
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
        groupedArray() {
            this.wordGroups = this.joinedAnswersAndWords.reduce((acc, cur) => {
            console.log("acc: ", acc, "cur", cur);
            const index = acc.findIndex((group) => group[0].groupId === cur.groupId);
                if (index === -1) {
                    acc.push([cur]);
                    console.log("acc: ", acc, "cur", cur);
                } else {
                    acc[index].push(cur);
                    console.log("acc: ", acc, "cur", cur);
                }
                console.log("acc array: ",acc);
                return acc;
            }, [])},
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
                word["groupId"] = userWords[i].groupId
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
            this.strongWords = this.joinedAnswersAndWords.filter(
                (word) => word.correctAnswers.length > word.wrongAnswers.length
            );
            this.weakWords = this.joinedAnswersAndWords.filter(
                (word) => word.wrongAnswers.length > word.correctAnswers.length
            );
            this.evenStrengthWords = this.joinedAnswersAndWords.filter(
                (word) => word.correctAnswers.length == word.wrongAnswers.length
            );
            },
            // The next function will filter each group of words into an array.
            // filterWordGroups(){
            //     this.wordGroups = this.joinedAnswersAndWords.filter(
            //                 (word) => word.groupId)
            // }
    },
});
