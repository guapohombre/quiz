const question = document.querySelector(".question");
const button = document.querySelector(".stop");
const count = document.querySelector(".count");
const skip = document.querySelector(".skip");

const questions = [
  { id: 0, question: "Why do you want to be part of YC?" },
  { id: 1, question: "Why is your product priced the way it is?" },
  {
    id: 2,
    question:
      "If your startup succeeds, what additional areas could you expand into?",
  },
  { id: 3, question: "What's the biggest mistake you have made?" },
  {
    id: 4,
    question: "What will be your biggest challenge two years from now?",
  },
  { id: 5, question: "Who are your competitors?" },
  {
    id: 6,
    question: "What makes your product different from existing options?",
  },
  { id: 7, question: "Who would you hire, or how would you add to your team?" },
  { id: 8, question: "How are you working to expand geographically?" },
  { id: 9, question: "What do you understand about your customers?" },
  { id: 10, question: "How will you make money?" },
  { id: 11, question: "Why isn't someone already doing this?" },
  {
    id: 12,
    question: "What do you know about this space/product others don't know?",
  },
  { id: 13, question: "What is the next step with the product evolution?" },
  { id: 14, question: "How do you know customers need what you're making?" },
  { id: 15, question: "Who would be your next hire?" },
  { id: 16, question: "How long can you go before funding?" },
  {
    id: 17,
    question:
      "Someone just showed us an idea like this right before you guys. I don't like it. What else do you have?",
  },
  { id: 18, question: "Will you incorporate as a US company?" },
  { id: 19, question: "How will you get users?" },
  { id: 20, question: "Will your team stick at this?" },
  { id: 21, question: "Have you raised funding?" },
  { id: 22, question: "What is your burn rate?" },
  { id: 23, question: "How do you know people want this?" },
  { id: 24, question: "What's the funniest thing that has happened to you?" },
  { id: 25, question: "Where will you locate?" },
  { id: 26, question: "Tell us something surprising you have done?" },
  { id: 27, question: "How are you meeting customers?" },
  {
    id: 28,
    question: "What obstacles will you face and how will you overcome them?",
  },
  { id: 29, question: "What else have you created together?" },
  { id: 30, question: "How will customers and/or users find out about you?" },
  { id: 31, question: "What's new about what you make?" },
  { id: 32, question: "Who would use your product?" },
  { id: 33, question: "Who needs what you're making?" },
  { id: 34, question: "What products are you going to build first?" },
  { id: 35, question: "Why will you succeed?" },
  { id: 36, question: "What is your user growth rate?" },
  { id: 37, question: "Who is the boss?" },
  { id: 38, question: "What systems have you hacked?" },
  { id: 39, question: "What domain expertise do you have?" },
  {
    id: 40,
    question:
      "What are the key things about your field that outsiders don't understand?",
  },
];

//array that stores all displayed questions
const completedQuestions = [];

//generate random integer that is between 0 and the number of questions
function getId() {
  return Math.floor(Math.random() * questions.length);
}

//get random id from questions array
let questionId = getId();

//set current question to question matching id
let currentQuestion = questions[questionId].question;

//add id of current question into completed questions array to prevent question from being asked again in this session
completedQuestions.push(questionId);

//display current question
question.textContent = currentQuestion;
let questionsInterval;

count.textContent = `${completedQuestions.length} of ${questions.length} total questions`;

// Get question that hasn't already been displayed
function getCurrentQuestion() {
  do {
    questionId = getId();
  } while (completedQuestions.includes(questionId));

  currentQuestion = questions[questionId].question;
  question.textContent = currentQuestion;
  completedQuestions.push(questionId);

  count.textContent = `${completedQuestions.length} of ${questions.length} total questions`;
}

//display question every x seconds
function runQuestions() {
  questionsInterval = setInterval(() => {
    getCurrentQuestion();

    if (completedQuestions.length >= questions.length) {
      //>=questions.length
      clearInterval(questionsInterval);
      completedQuestions.length = 0;
      button.textContent = "Start";
      skip.classList.toggle("hide");
      count.textContent = `0 of ${questions.length} total questions`;
    }
  }, 10000);
}

//Manage button events

button.addEventListener("click", (e) => {
  buttonText = e.target.textContent;
  if (buttonText === "Start") {
    getCurrentQuestion();
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
    getCurrentQuestion();
    runQuestions();
    skip.classList.toggle("hide");
  }
});

skip.addEventListener("click", (e) => {
  clearInterval(questionsInterval);
  let questionId = getId();

  let currentQuestion = questions[questionId].question;
  completedQuestions.push(questionId);
  question.textContent = currentQuestion;

  count.textContent = `${completedQuestions.length} of ${questions.length} total questions`;
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
