const url = "https://guapohombre.github.io/quizData/quiz.json";

const question = document.querySelector(".question");
const button = document.querySelector(".stop");
const count = document.querySelector(".count");
const skip = document.querySelector(".skip");
const answer = document.querySelector(".answer");

const completedQuestions = [];

function addListeners(questions) {
  button.addEventListener("click", (e) => {
    buttonText = e.target.textContent;
    if (buttonText === "Start") {
      getQuestion(questions);
      runQuestions(questions);
      e.target.textContent = "Pause";
      skip.classList.toggle("hide");
    }

    if (buttonText === "Pause") {
      e.target.textContent = "Resume";
      clearInterval(questionsInterval);
      skip.classList.toggle("hide");
    }

    if (buttonText === "Resume") {
      e.target.textContent = "Pause";
      getQuestion(questions);
      runQuestions(questions);
      skip.classList.toggle("hide");
    }
  });

  skip.addEventListener("click", (e) => {
    clearInterval(questionsInterval);
    getQuestion(questions);
    // runQuestions(questions);

    if (completedQuestions.length >= questions.length) {
      //>=questions.length
      clearInterval(questionsInterval);
      completedQuestions.length = 0;
      button.textContent = "Start";
      skip.classList.toggle("hide");
      count.textContent = `0 of ${questions.length} total questions`;
    } else {
      runQuestions(questions);
    }
  });
}

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();
  const questions = data.questions;
  addListeners(questions);
  getQuestion(questions);
}

getData(url);

function getQuestion(questions) {
  console.log(questions);
  let questionId;
  do {
    questionId = Math.floor(Math.random() * questions.length);
  } while (completedQuestions.includes(questionId));
  loadData(questions, questionId);
}

function loadData(questions, questionId) {
  //set current question to question matching id
  let currentQuestion = questions[questionId].question;
  let currentOwner = questions[questionId].owner;
  let currentAnswer = questions[questionId].answer;

  //add id of current question into completed questions array to prevent question from being asked again in this session
  completedQuestions.push(questionId);
  console.log(completedQuestions);

  //display current question
  question.textContent = currentQuestion;
  answer.textContent = currentAnswer;
  let questionsInterval;

  count.textContent = `${completedQuestions.length} of ${questions.length} total questions`;
}

function runQuestions(questions) {
  questionsInterval = setInterval(() => {
    getQuestion(questions);

    if (completedQuestions.length >= questions.length) {
      //>=questions.length
      clearInterval(questionsInterval);
      completedQuestions.length = 0;
      button.textContent = "Start";
      skip.classList.toggle("hide");
      count.textContent = `0 of ${questions.length} total questions`;
    }
  }, 2000);
}
