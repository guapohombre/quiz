const url = "https://guapohombre.github.io/quizData/quiz.json";

const question = document.querySelector(".question");
const button = document.querySelector(".stop");
const count = document.querySelector(".count");
const skip = document.querySelector(".skip");
const answer = document.querySelector(".answer");
const selectUser = document.querySelector(".selectUser");
const users = document.querySelectorAll(".btn-user");
const answerHeader = document.querySelector(".answerHeader");

const completedQuestions = [];

//current app user
let currentUser = "All";
//initialize questions
let questions = [];
let allQuestions = [];
let questionsInterval;

//logic to show answer
answerHeader.addEventListener("click", (e) => {
  let answerText = e.target.textContent;
  e.target.textContent === "Click to show answer"
    ? (e.target.textContent = "Answer")
    : (e.target.textContent = "Click to show answer");

  answer.classList.toggle("hide");
});

//logic to select current app user.  Default is 'All'
selectUser.addEventListener("click", (e) => {
  currentUser = e.target.textContent;
  users.forEach((user) => {
    if (user.textContent === currentUser) {
      user.classList.add("btn-user-selected");
    } else {
      user.classList.remove("btn-user-selected");
    }
  });
  questions = filterQuestions(allQuestions);
  clearInterval(questionsInterval);

  completedQuestions.length = 0;
  button.textContent = "Start";
  skip.classList.add("hide");

  makeQuestionCountText();
});

//logic to filter questions based on current user.  Takes full questions array as argument

function filterQuestions(questions) {
  if (currentUser === "All") return questions;
  const filteredQuestions = questions.filter((question) => {
    if (question.owner === currentUser) return question;
  });

  return filteredQuestions;
}

function addListeners() {
  button.addEventListener("click", (e) => {
    buttonText = e.target.textContent;
    if (buttonText === "Start") {
      getQuestion();
      runQuestions();
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
      getQuestion();
      runQuestions();
      skip.classList.toggle("hide");
    }
  });

  skip.addEventListener("click", (e) => {
    clearInterval(questionsInterval);
    getQuestion();
    // runQuestions(questions);

    if (completedQuestions.length >= questions.length) {
      //>=questions.length
      clearInterval(questionsInterval);
      completedQuestions.length = 0;
      button.textContent = "Start";
      skip.classList.toggle("hide");
      count.textContent = `0 of ${questions.length} total questions`;
    } else {
      runQuestions();
    }
  });
}

//function to get data and add event listeners
async function getData(url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    allQuestions = data.questions;
    questions = filterQuestions(allQuestions);

    addListeners();
    getQuestion();
  } catch {
    throw new Error("There was a problem getting the data");
  }
}

//runs function to fetch data from GitHub
getData(url);

function getQuestion() {
  let questionId;
  do {
    questionId = Math.floor(Math.random() * questions.length);
  } while (completedQuestions.includes(questionId));
  loadData(questionId);
}

function loadData(questionId) {
  //set current question to question matching id
  let currentQuestion = questions[questionId].question;
  let currentOwner = questions[questionId].owner;
  let currentAnswer = questions[questionId].answer;
  answerHeader.textContent = "Click to show answer";
  answer.classList.add("hide");

  //add id of current question into completed questions array to prevent question from being asked again in this session
  completedQuestions.push(questionId);

  //display current question
  question.textContent = currentQuestion;
  answer.textContent = currentAnswer;
  let questionsInterval;
  makeQuestionCountText();
}

function makeQuestionCountText() {
  count.textContent = `${completedQuestions.length} of ${questions.length} total questions`;
}

function runQuestions() {
  // questions = filterQuestions(questions);
  questionsInterval = setInterval(() => {
    getQuestion();

    if (completedQuestions.length >= questions.length) {
      //>=questions.length
      clearInterval(questionsInterval);
      completedQuestions.length = 0;
      button.textContent = "Start";
      skip.classList.toggle("hide");
      makeQuestionCountText();
    }
  }, 10000);
}
