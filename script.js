const questions = [
  {
    question: "Which keyword declares a variable?",
    answers: ["let", "print", "show", "write"],
    correctAnswer: "let",
  },
  {
    question: "Which symbol is used for addition?",
    answers: ["-", "+", "*", "/"],
    correctAnswer: "+",
  },
  {
    question: "Which value represents true?",
    answers: ["false", "0", "true", "null"],
    correctAnswer: "true",
  },
  {
    question: "Which method adds an item to an array?",
    answers: ["pop()", "push()", "shift()", "slice()"],
    correctAnswer: "push()",
  },
  {
    question: "Which keyword is used to check a condition?",
    answers: ["if", "let", "const", "var"],
    correctAnswer: "if",
  },
];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("finalScore");
const resultsElement = document.getElementById("results");

let currentQuestionIndex = 0;
let score = 0;
let questionResults = [];
let answered = false;

const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  questionResults = [];

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
};

const showQuestion = () => {
  if (currentQuestionIndex >= questions.length) {
    showResults();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];

  answered = false;

  questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionElement.textContent = currentQuestion.question;
  scoreElement.textContent = `Score: ${score}`;

  answerButtons.innerHTML = "";
  nextButton.classList.add("hidden");

  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const answer = currentQuestion.answers[i];
    const button = document.createElement("button");

    button.textContent = answer;
    button.className =
      "answer-button w-full text-left bg-[#222647] hover:bg-purple-900 border border-gray-700 px-4 py-3 rounded-lg transition";

    button.onclick = () => {
      checkAnswer(answer, button);
    };

    answerButtons.appendChild(button);
  }
};

const checkAnswer = (selectedAnswer, selectedButton) => {
  if (answered) {
    return;
  }

  answered = true;

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  if (isCorrect) {
    score++;
  }

  const buttons = answerButtons.querySelectorAll("button");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    button.disabled = true;

    if (button.textContent === currentQuestion.correctAnswer) {
      button.classList.remove("bg-[#222647]");
      button.classList.add("bg-green-700", "border-green-400");
    } else if (button === selectedButton) {
      button.classList.remove("bg-[#222647]");
      button.classList.add("bg-red-700", "border-red-400");
    }
  }

  scoreElement.textContent = `Score: ${score}`;

  questionResults.push({
    question: currentQuestion.question,
    selectedAnswer: selectedAnswer,
    correctAnswer: currentQuestion.correctAnswer,
    isCorrect: isCorrect,
  });

  nextButton.classList.remove("hidden");
};

const nextQuestion = () => {
  currentQuestionIndex++;
  showQuestion();
};

const showResults = () => {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
  resultsElement.innerHTML = "";

  for (let i = 0; i < questionResults.length; i++) {
    const result = questionResults[i];
    const resultItem = document.createElement("div");

    resultItem.className = "bg-[#101225] border border-gray-700 p-4 rounded-lg";

    const questionTitle = document.createElement("p");
    questionTitle.className = "font-semibold mb-2";
    questionTitle.textContent = `${i + 1}. ${result.question}`;

    const selectedAnswer = document.createElement("p");
    selectedAnswer.className = "text-gray-300 text-sm mb-1";
    selectedAnswer.textContent = `Your answer: ${result.selectedAnswer}`;

    const correctAnswer = document.createElement("p");
    correctAnswer.className = "text-green-400 text-sm mb-2";
    correctAnswer.textContent = `Correct answer: ${result.correctAnswer}`;

    resultItem.appendChild(questionTitle);
    resultItem.appendChild(selectedAnswer);
    resultItem.appendChild(correctAnswer);

    resultsElement.appendChild(resultItem);
  }
};

startButton.onclick = () => {
  startQuiz();
};

nextButton.onclick = () => {
  nextQuestion();
};

restartButton.onclick = () => {
  startQuiz();
};
