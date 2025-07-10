"use strict";
let startQuizBtn = document.getElementById("startQuizBtn");
let categorySelect = document.getElementById("categorySelect");
let difficultySelect = document.getElementById("difficultySelect");
let quizScreen = document.getElementById("quizScreen");
let questionText = document.getElementById("questionText");
let answerOptions = document.getElementById("answerOptions");
let nextQuestion = document.getElementById("nextQuestion");
const getCategory = async () => {
    let data = await fetch("https://opentdb.com/api_category.php");
    let res = await data.json();
    res.trivia_categories.forEach((category) => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
};
getCategory();
// _______________________________________________________________________________________________ //
let count = 0;
let result = [];
const getQuizes = async () => {
    try {
        let data = await fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelect.value}&difficulty=${difficultySelect.value}`);
        let res = await data.json();
        result = res.results;
        showQuestion();
    }
    catch (error) {
        console.log(error);
    }
};
const showQuestion = () => {
    let options = [];
    result.forEach((question) => {
        console.log(question);
    });
};
startQuizBtn.addEventListener("click", () => {
    getQuizes();
});
// nextQuestion.addEventListener('click', ()=>{
//   console.log(result[count]);
//   count++;
// })
