//index.html grabs
let body = document.body;
//header grabs
let highScoreEl = document.getElementById("highscores");
let timerEl = document.getElementById("timer");
let timeLeftEl = document.getElementById("time-left");
//opening page grabs
let openingEl = document.getElementById("opening-page");
let startBtn = document.getElementById("start-btn");
//question and answer button grabs and styling
let questionBoxEl = document.getElementById("question-box");
questionBoxEl.setAttribute("style", "display:none");
let questionsEl = document.getElementById("questions");
let answersEL = document.getElementById("answers");
let questionBtnA = document.createElement("button");
questionBtnA.setAttribute("class", "questionButton")
let questionBtnB = document.createElement("button");
questionBtnB.setAttribute("class", "questionButton")
let questionBtnC = document.createElement("button");
questionBtnC.setAttribute("class", "questionButton")
let questionBtnD = document.createElement("button");
questionBtnD.setAttribute("class", "questionButton")
let rightWrongEl = document.createElement("div");
rightWrongEl.setAttribute("class", "rightWrong")
answersEL.appendChild(questionBtnA);
answersEL.appendChild(questionBtnB);
answersEL.appendChild(questionBtnC);
answersEL.appendChild(questionBtnD);
questionBoxEl.appendChild(rightWrongEl);
//final page grabs
let finalEl = document.getElementById("final-box");
finalEl.setAttribute("style", "display:none");
let fScoreEl = document.getElementById("final-score");
let initialsEl = document.getElementById("initials");
let submitBtn = document.getElementById("submit-btn");
//global vars
let timeRemaining = 90;
let questionIndex = 0;
let currentQuestion = 0;
let rightAnswers = 0;
let wrongAnswers = 0;
let timerInterval;

// quiz questions obtained from https://www.geeksforgeeks.org/javascript-quiz-set-1/?ref=lbp and https://www.geeksforgeeks.org/javascript-quiz-set-2/?ref=lbp
let questions = [
  {
    question:
      "1. What is the HTML tag under which one can write the JavaScript code?",
    choices: ["A. <javascript>", "B. <scripted>", "C. <script>", "D. <js>"],
    answer: "C. <script>",
  },

  {
    question:
      "2. Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?",
    choices: [
      "A. alertbox(“GeeksforGeeks”);",
      "B. msg(“GeeksforGeeks”);",
      "C. <script ref=”geek.js”>",
      "D. alert(“GeeksforGeeks”);",
    ],
    answer: "D. alert(“GeeksforGeeks”);",
  },

  {
    question:
      "3. What is the correct syntax for referring to an external script called “geek.js”?",
    choices: [
      "A. <script src=”geek.js”>",
      "B. <script href=”geek.js”>",
      "C. msgbox(“GeeksforGeeks”);",
      "D. <script name=”geek.js”>",
    ],
    answer: "A. <script src=”geek.js”>",
  },

  {
    question: "4. Which of the following is not a reserved word in JavaScript?",
    choices: ["A. interface", "B. throws", "C. program", "D. short"],
    answer: "C. program",
  },

  {
    question:
      "5. What is the syntax for creating a function in JavaScript named as Geekfunc?",
    choices: [
      "A. function = Geekfunc() ",
      "B. function Geekfunc()",
      "C. function := Geekfunc()",
      "D. function : Geekfunc()",
    ],
    answer: "B. function Geekfunc()",
  },

  {
    question:
      "6. What is the correct syntax for adding comments in JavaScript?",
    choices: [
      "A. <!–This is a comment–&gt",
      "B. //This is a comment",
      "C. –This is a comment",
      "D. **This is a comment**",
    ],
    answer: "B. //This is a comment",
  },

  {
    question:
      "7. What is the JavaScript syntax for printing values in Console?",
    choices: [
      "A. print(5)",
      "B. console.log(5);",
      "C. console.print(5);",
      "D. print.console(5);",
    ],
    answer: "B. console.log(5);",
  },

  {
    question: "8. How do you initialize an array in JavaScript?",
    choices: [
      "A. var Geeks= “Geek1”, “Geek2”, “Geek3”",
      "B. var Geeks=(1:Geek1, 2:Geek2, 3:Geek3)",
      "C. var Geeks=(1=Geek1, 2=Geek2, 3=Geek3)",
      "D. var Geeks=[“Geek1”, “Geek2”, “Geek3”]",
    ],
    answer: "D. var Geeks=[“Geek1”, “Geek2”, “Geek3”]",
  },
];
// Start timer and game
function startTimer() {
  openingEl.setAttribute("style", "display:none");
  timeLeftEl.textContent = timeRemaining;
  timerInterval = setInterval(() => {
    timeRemaining--;
    timeLeftEl.textContent = timeRemaining;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      stopQuiz();
      alert("Time's Up! Please Refresh the Page and Try Again!");
    }
  }, 1000);
  showNextQuestion();
}
// Shows questions and answer choices
function showNextQuestion() {
  if (questionBoxEl.style.display === "none") {
    questionBoxEl.style.display = "block";
  }
  questionsEl.textContent = questions[currentQuestion].question;
  questionBtnA.textContent = questions[currentQuestion].choices[0];
  questionBtnB.textContent = questions[currentQuestion].choices[1];
  questionBtnC.textContent = questions[currentQuestion].choices[2];
  questionBtnD.textContent = questions[currentQuestion].choices[3];
}
// Code to select answers
answersEL.addEventListener("click", function (event) {
  let element = event.target;

  if (element.matches("button")) {
    element = element.textContent;
  }
  if (element == questions[currentQuestion].answer) {
    rightWrongEl.textContent = "That's Right!";
    rightAnswers++;
  } else {
    rightWrongEl.textContent = "Wrong! 10 Second Penalty!";
    timeRemaining = timeRemaining - 10;
    timeLeftEl.textContent = timeRemaining;
    wrongAnswers++;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showNextQuestion();
  } else {
    clearInterval(timerInterval);
    stopQuiz();
    fScoreEl.textContent = rightAnswers;
  }
});
// Clear Q and A section and brings up final page
function stopQuiz() {
  questionBoxEl.style.display = "none";
  finalEl.style.display = "block";
}

// Saves initials and scores to local storage
function saveHighScore() {
  let initials = initialsEl.value.trim();

  if (initials !== "") {
    let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    let quizResult = { initials: initials, score: rightAnswers };
    highScores.push(quizResult);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));
    initialsEl.value = "";
  }
};

// Button functions
startBtn.onclick = startTimer
submitBtn.onclick = saveHighScore;


