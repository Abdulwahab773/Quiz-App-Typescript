"use strict";
let startQuizBtn = document.getElementById("startQuizBtn");
let categorySelect = document.getElementById("categorySelect");
let difficultySelect = document.getElementById("difficultySelect");
let quizScreen = document.getElementById("quizScreen");
let questionText = document.getElementById("questionText");
let answerOptions = document.getElementById("answerOptions");
let nextQuestion = document.getElementById("nextQuestion");
let resultScreen = document.getElementById("resultScreen");
let startScreen = document.getElementById("startScreen");
let score = document.getElementById("score");
let questionCount = document.getElementById("questionCount");
let timer = document.getElementById("timer");
let restartQuizBtn = document.getElementById("restartQuizBtn");
const getCategory = async () => {
    let data = await fetch("https://opentdb.com/api_category.php");
    let res = await data.json();
    res.trivia_categories.forEach((category) => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
};
getCategory();
let index = 0;
let questions = [];
let options = [];
let num = 0;
const getQuizes = async () => {
    try {
        let data = await fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelect.value}&difficulty=${difficultySelect.value}`);
        let res = await data.json();
        questions = res.results;
        showQuestion();
    }
    catch (error) {
        console.log(error);
    }
};
const showQuestion = () => {
    if (index >= questions.length) {
        setTimeout(() => {
            resultScreen.classList.remove("hidden");
        }, 500);
        quizScreen.classList.add("hidden");
        startScreen.classList.add("hidden");
        timer.classList.add("hidden");
        return;
    }
    options = [...questions[index].incorrect_answers, questions[index].correct_answer].sort(() => Math.random() - 0.5);
    answerOptions.innerHTML = options.map((opt, i) => `<button onclick="checkAns(${i})" class="option-btn">${opt}</button>`).join("");
    questionText.innerHTML = questions[index].question;
    questionCount.innerText = `${index + 1}`;
    nextQuestion.disabled = true;
    quizScreen.classList.remove("hidden");
    timer.classList.remove("hidden");
    handleTimer();
};
const checkAns = (idx) => {
    clearInterval(timerInterval);
    const allButtons = document.querySelectorAll(".option-btn");
    const correctAns = questions[index].correct_answer;
    nextQuestion.disabled = false;
    allButtons.forEach((btn, i) => {
        btn.disabled = true;
        btn.style.opacity = "0.7";
        if (btn.textContent === correctAns) {
            btn.style.backgroundColor = "#4caf50";
            btn.style.color = "#fff";
            btn.style.opacity = "1";
        }
        if (i === idx) {
            if (btn.textContent === correctAns) {
                btn.style.backgroundColor = "#4caf50";
                btn.style.color = "#fff";
                num++;
            }
            else {
                btn.style.backgroundColor = "#f44336";
                btn.style.opacity = "1";
                btn.style.color = "#fff";
            }
        }
    });
    score.innerHTML = num.toString();
};
let timerInterval;
let time = 30;
const handleTimer = () => {
    time = 30;
    timer.innerText = `Timer: 00:${time < 10 ? "0" + time : time}`;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        time--;
        timer.innerText = `Timer: 00:${time < 10 ? "0" + time : time}`;
        if (time <= 0) {
            clearInterval(timerInterval);
            index++;
            showQuestion();
        }
    }, 1000);
};
startQuizBtn.addEventListener("click", () => {
    getQuizes();
    startScreen.classList.add("hidden");
});
nextQuestion.addEventListener('click', () => {
    index++;
    showQuestion();
});
restartQuizBtn.addEventListener('click', () => {
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    index = 0;
    questions = [];
    num = 0;
    clearInterval(timerInterval);
});
