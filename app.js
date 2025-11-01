const loading = document.getElementById("loading");
const welcome = document.getElementById("welcome");
const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");
const optionsContainer = document.getElementById("optionsContainer");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Mark Language",
      "Hyper Transfer Makeup Language"
    ],
    correct: "Hyper Text Markup Language",
    image: "images/html.png"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-weight"],
    correct: "font-size",
    image: "images/css.png"
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    options: ["<link>", "<js>", "<script>", "<style>"],
    correct: "<script>",
    image: "images/js.png"
  },
  {
    question: "Which layout model does Flexbox represent?",
    options: ["2D Grid", "1D layout", "Float-based", "Inline-block layout"],
    correct: "1D layout",
    image: "images/flexbox.png"
  },
  {
    question: "What is the purpose of media queries in CSS?",
    options: [
      "To create animations",
      "To adapt layout to device screen size",
      "To fetch API data",
      "To style images"
    ],
    correct: "To adapt layout to device screen size",
    image: "images/css.png"
  },
  {
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<head>", "<h6>", "<heading>", "<h1>"],
    correct: "<h1>",
    image: "images/html.png"
  },
  {
    question: "In CSS, how do you select an element with the id 'header'?",
    options: [".header", "header", "#header", "*header"],
    correct: "#header",
    image: "images/css.png"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Laravel", "React", "Flask"],
    correct: "React",
    image: "images/js.png"
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "background-color", "bgcolor", "background"],
    correct: "background-color",
    image: "images/css.png"
  },
  {
    question: "Which of the following is NOT a semantic HTML element?",
    options: ["<article>", "<footer>", "<div>", "<header>"],
    correct: "<div>",
    image: "images/html.png"
  }
];

let currentQuestion = 0;
let userAnswers = [];

window.onload = () => {
  setTimeout(() => {
    loading.classList.add("hidden");
    welcome.classList.remove("hidden");
  }, 1500);
};

startBtn.addEventListener("click", () => {
  welcome.classList.add("hidden");
  quiz.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = quizQuestions[currentQuestion];
  questionText.textContent = q.question;
  questionImage.src = q.image;
  optionsContainer.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("div");
    btn.classList.add("option");
    btn.textContent = option;
    btn.onclick = () => selectOption(btn, option);
    optionsContainer.appendChild(btn);
  });
}

let selectedAnswer = null;

function selectOption(element, answer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => opt.classList.remove("selected"));
  element.classList.add("selected");
  selectedAnswer = answer;
}

submitBtn.addEventListener("click", () => {
  if (!selectedAnswer) return alert("Please select an answer!");

  const current = quizQuestions[currentQuestion];
  userAnswers.push({
    question: current.question,
    chosen: selectedAnswer,
    correct: current.correct
  });

  currentQuestion++;
  selectedAnswer = null;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quiz.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  let score = 0;
  resultDiv.innerHTML = "Your Results";

  userAnswers.forEach((item, index) => {
    const isCorrect = item.chosen === item.correct;
    if (isCorrect) score++;
    resultDiv.innerHTML += `
      <div class="option ${isCorrect ? "correct" : "wrong"}">
        <p><strong>${index + 1})</strong> ${item.question}</p>
        <p>Your answer: ${item.chosen}</p>
        <p>Correct answer: ${item.correct}</p>
      </div>
    `;
  });

  resultDiv.innerHTML += `Final Score: ${score} / ${quizQuestions.length}`;
}
