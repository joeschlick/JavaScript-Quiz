//index.html grabs
let body = document.body;
//header grabs
let highScoreEl = document.getElementById("highscores");
let timerEl = document.getElementById("timer");
let timeLeftEl = document.getElementById("time-left");
//opening page grabs
let openingEl = document.getElementById("opening-page");
let startBtn = document.getElementById("start-btn");
//question and answers grabs and styling
let questionBoxEl = document.getElementById("question-box");
questionBoxEl.setAttribute("style", "display:none");
let questionsEl = document.getElementById("questions");
let answersEL = document.getElementById("answers");
let questionBtnA = document.createElement("button");
let questionBtnB = document.createElement("button");
let questionBtnC = document.createElement("button");
let questionBtnD = document.createElement("button");
let rightWrongEl = document.createElement("div");
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
//scores.html grabs
let scoreList = document.getElementById("scores-list");
let goBackBtn = document.getElementById("go-back-btn");
let clearBtn = document.getElementById("clear-btn");

let timeRemaining = 90;
let questionIndex = 0;
let currentQuestion = 0;
let rightAnswers = 0;
let wrongAnswers = 0;

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

function startTimer() {
  openingEl.setAttribute("style", "display:none");
  timeLeftEl.textContent = timeRemaining;
  let timerInterval = setInterval(() => {
    timeRemaining--;
    timeLeftEl.textContent = timeRemaining;

    if (timeRemaining === 0) {
      clearInterval(timerInterval);
      stopQuiz();
      alert("Time's Up!");
    }
  }, 1000);
  showNextQuestion();
}

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
    //Not working!! Need to figure out how to access timeInterval from here
    clearInterval(timeRemaining);
    stopQuiz();
    fScoreEl.textContent = rightAnswers;
  }
});

function stopQuiz() {
  questionBoxEl.style.display = "none";
  finalEl.style.display = "block";
}

let quizResult = {};
let highScores = [];

// init();

// function renderScores() {
//   scoreList.innerHTML = "";

//   for (var i = 0; i < highScores.length; i++) {
//     let highScore = highScores[i];

//     let li = document.createElement("li");
//     li.textContent = highScore;
//     li.setAttribute("data-index", i);

//     scoreList.appendChild(li);
//   }
// }

submitBtn.addEventListener("submit", function (event) {
  event.preventDefault();

  let initials = initialsEl.value.trim();
  let finalScore = rightAnswers;

  if (initials === "") {
    return;
  }

  quizResult = { player: initials, score: finalScore };
  highscoreList.push(quizResult);
  initialsEl.value = "";
});

startBtn.addEventListener("click", function (event) {
  startTimer();
});

// quiz questions obtained from https://www.geeksforgeeks.org/javascript-quiz-set-1/?ref=lbp and https://www.geeksforgeeks.org/javascript-quiz-set-2/?ref=lbp

// 1. What is the HTML tag under which one can write the JavaScript code?
// A) <javascript>
// B) <scripted>
// C) <script>
// D) <js>
// Ans: C

// 2. Which of the following is the correct syntax to display “GeeksforGeeks” in an alert box using JavaScript?
// A. alertbox(“GeeksforGeeks”);
// B. msg(“GeeksforGeeks”);
// C. msgbox(“GeeksforGeeks”);
// D. alert(“GeeksforGeeks”);
// Ans: D

// 3. What is the correct syntax for referring to an external script called “geek.js”?
// A. <script src=”geek.js”>
// B. <script href=”geek.js”>
// C. <script ref=”geek.js”>
// D. <script name=”geek.js”>
// Ans: A

// 4. Which of the following is not a reserved word in JavaScript?
// A. interface
// B. throws
// C. program
// D. short
// Ans: C

// 5. What is the syntax for creating a function in JavaScript named as Geekfunc?
// A) function = Geekfunc()
// B) function Geekfunc()
// C) function := Geekfunc()
// D) function : Geekfunc()
// Ans: Option B

// 7. How to write an ‘if’ statement for executing some code.
// If “i” is NOT equal to 5?
// A) if(i<>5)
// B) if i<>5
// C) if(i!=5)
// D) if i!=5
// Ans: C

// 8. What is the correct syntax for adding comments in JavaScript?
// A) <!–This is a comment–&gt
// B) //This is a comment
// C) –This is a comment
// D) **This is a comment**
// Ans: B

// // 9. What is the JavaScript syntax for printing values in Console?
// A) print(5)
// B) console.log(5);
// C) console.print(5);
// D) print.console(5);
// Ans: Option B

// 10. How to initialize an array in JavaScript?
// A) var Geeks= “Geek1”, “Geek2”, “Geek3”
// B) var Geeks=(1:Geek1, 2:Geek2, 3:Geek3)
// C) var Geeks=(1=Geek1, 2=Geek2, 3=Geek3)
// D) var Geeks=[“Geek1”, “Geek2”, “Geek3”]
// Ans: D
