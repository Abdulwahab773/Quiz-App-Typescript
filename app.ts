let startQuizBtn = document.getElementById("startQuizBtn") as HTMLButtonElement;
let categorySelect = document.getElementById("categorySelect") as HTMLSelectElement;
let difficultySelect = document.getElementById("difficultySelect") as HTMLSelectElement;
let quizScreen = document.getElementById("quizScreen") as HTMLDivElement;
let questionText = document.getElementById("questionText") as HTMLHeadingElement;
let answerOptions = document.getElementById("answerOptions") as HTMLUListElement;
let nextQuestion = document.getElementById("nextQuestion") as HTMLButtonElement;

interface QuizQuestion {
  category: string;
  correct_answer: string;
  difficulty: "easy" | "medium" | "hard";
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
}

interface QuizAPIResponse {
  response_code: number;
  results: QuizQuestion[];
}

interface CategoriesAPIResponse {
  id: number;
  name: string;
}

interface Categories {
  trivia_categories: CategoriesAPIResponse[];
}

const getCategory = async () => {
  let data = await fetch("https://opentdb.com/api_category.php");
  let res: Categories = await data.json();

  res.trivia_categories.forEach((category) => {
    categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
  });
};

getCategory();

// _______________________________________________________________________________________________ //


let count = 0;
let result: QuizQuestion[] = []

const getQuizes = async () => {
  try {
    
    let data = await fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelect.value}&difficulty=${difficultySelect.value}`);
    let res: QuizAPIResponse = await data.json();
    result = res.results;
    
    
    
    showQuestion()
  } catch (error) {
    console.log(error);
  }
};




const showQuestion = () => {
  let options: string[] = [];
  result.forEach((question) => {
    console.log(question);
    
  })
}






startQuizBtn.addEventListener("click", () => {
  getQuizes();
});


// nextQuestion.addEventListener('click', ()=>{
//   console.log(result[count]);
//   count++;
// })