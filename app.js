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
    image: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
  },
  {
    question: "Which CSS property controls text size?",
    options: ["font-style", "text-size", "font-size", "text-weight"],
    correct: "font-size",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
  },
  {
    question: "Which tag is used to include JavaScript in HTML?",
    options: ["<link>", "<js>", "<script>", "<style>"],
    correct: "<script>",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"
  },
  {
    question: "Which layout model does Flexbox represent?",
    options: ["2D Grid", "1D layout", "Float-based", "Inline-block layout"],
    correct: "1D layout",
    image: "https://cdn-icons-png.flaticon.com/512/919/919826.png"
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
    image: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
  },
  {
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<head>", "<h6>", "<heading>", "<h1>"],
    correct: "<h1>",
    image: "https://cdn-icons-png.flaticon.com/512/888/888848.png"
  },
  {
    question: "In CSS, how do you select an element with the id 'header'?",
    options: [".header", "header", "#header", "*header"],
    correct: "#header",
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "Laravel", "React", "Flask"],
    correct: "React",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["color", "background-color", "bgcolor", "background"],
    correct: "background-color",
    image: "https://cdn-icons-png.flaticon.com/512/888/888879.png"
  },
  {
    question: "Which of the following is NOT a semantic HTML element?",
    options: ["<article>", "<footer>", "<div>", "<header>"],
    correct: "<div>",
    image: "https://cdn-icons-png.flaticon.com/512/733/733585.png"
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
  resultDiv.innerHTML = "<h2>Your Results</h2>";

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

  resultDiv.innerHTML += `<h3>Final Score: ${score} / ${quizQuestions.length}</h3>`;
}
