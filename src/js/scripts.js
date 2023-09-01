const questions = [
    {
        id: 1,
        question: "What's the capital of Australia?",
        options: ["Sydney", "Canberra", "Melborne", "Brisbane"],
        correct:"Canberra" ,
    },
    {
        id: 2,
        question: "What's the capital of Germany?",
        options: ["Berlin", "Frankfurt", "Munich", "Hamburg"],
        correct:"Berlin" ,
    },
    {
        id: 3,
        question: "What's the capital of Canada?",
        options: ["Quebec", "Ottawa", "Toronto", "Vancouver"],
        correct:"Ottawa" ,
    },
    {
        id: 4,
        question: "What's the capital of Spain?",
        options: ["Barcelona", "Madrid", "Valencia", "Granada"],
        correct:"Madrid" ,
    },
    {
        id: 5,
        question: "What's the capital of Switzerland?",
        options: ["Zurich", "Bern", "Basel", "Thun"],
        correct:"Bern" ,
    },
    {
        id: 6,
        question: "What's the capital of Philipinnes?",
        options: ["Bacolod", "Vigan City", "Makati", "Manila"],
        correct:"Manila" ,
    },
    {
        id: 7,
        question: "What's the capital of China?",
        options: ["Shanghai", "Nanjing", "HongKong", "Beijing"],
        correct:"Beijing" ,
    },
    {
        id: 8,
        question: "What's the capital of Iran?",
        options: ["Shiraz", "Tehran", "Gilan", "Isfahan"],
        correct:"Tehran" ,
    },
    {
        id: 9,
        question: "What's the capital of Japan?",
        options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
        correct:"Tokyo" ,
    },
    {
        id: 10,
        question: "What's the capital of Sweden?",
        options: ["Stockholm", "Gothenburg", "Orebro", "Malmo"],
        correct:"Stockholm" ,
    },
]

// selects
const startBtn = document.querySelector("#start-quiz")
const quizSection = document.querySelector("#quiz-section")
const quizText = document.querySelector("#quiz-text");
const quizOptions = document.querySelector("#quiz-options")
const numberOfCount = document.querySelector("#number-of-count")
const nextBtn = document.querySelector("#next-btn");
const scoreSection = document.querySelector("#score-section");
const score = document.querySelector("#score");
const closeGame = document.querySelector("#close-game")
const playAgain = document.querySelector("#play-again")
const byeSection = document.querySelector("#bye-section")
const quizContainer = document.querySelector("#quiz-container")
const timeLeft = document.querySelector("#time-left")

let questionCount;
let scoreCount = 0;
let count = 10;
let countdown;


// events
startBtn.addEventListener("click", showQuiz);
nextBtn.addEventListener("click", nextQuestion);
closeGame.addEventListener("click", closeAndBye);
playAgain.addEventListener("click", restartGame);




// functions

// start btn
function showQuiz(){
    quizSection.classList.remove("hidden");
    startBtn.classList.add("hidden")
    initial();
}

// quiz creation
function quizCreator(){
    // randomly sort questions
    questions.sort(()=> Math.random() - 0.5);

    // generate a question
    questions.forEach (q => {
        // randomly sort options
        q.options.sort(()=> Math.random() - 0.5)
        // question card
        let div = document.createElement("div");
        div.classList.add("question-card", "hidden");
        // question number
        numberOfCount.innerHTML = 1 + " of " + questions.length + " Question";
        // question
        let question_P = document.createElement("p");
        question_P.classList.add("mb-5", "font-bold")
        question_P.innerHTML = q.question;
        div.appendChild(question_P);
        //options
        div.innerHTML += `
            <button class="btnOpt block text-left mb-2 rounded-lg p-2 border border-slate-300 w-full">${q.options[0]}</button>
            <button class="btnOpt block text-left mb-2 rounded-lg p-2 border border-slate-300 w-full">${q.options[1]}</button>
            <button class="btnOpt block text-left mb-2 rounded-lg p-2 border border-slate-300 w-full">${q.options[2]}</button>
            <button class="btnOpt block text-left mb-2 rounded-lg p-2 border border-slate-300 w-full">${q.options[3]}</button>
        `;
        quizContainer.appendChild(div);
})
    let optionBtns = document.querySelectorAll(".btnOpt");
    optionBtns.forEach(btn => btn.addEventListener("click",(e)=> checker(e)))
}

// next button
function nextQuestion(){
 questionCount += 1;
 if(questionCount == questions.length){
    quizSection.classList.add("hidden")
    scoreSection.classList.remove("hidden");
    score.innerHTML = `Your score is  ${scoreCount} out of  ${questionCount}`;

 }else{
    numberOfCount.innerHTML = questionCount + 1 + " of " + questions.length + " Question";
    quizDisplay(questionCount);
    count= 10;
    clearInterval(countdown);
    timerDisplay();
 }
}

// display quiz
function quizDisplay(questionCount){
    let questionCards = document.querySelectorAll(".question-card");
    // hide other cards
    questionCards.forEach(card => {
        card.classList.add("hidden")
    });
    // display current question card
    questionCards[questionCount].classList.remove("hidden");
}

// checker function - to check user's answer
function checker(e){
    let userAnswer = e.target.innerText;
    // console.log(userAnswer);
    let question = document.getElementsByClassName("question-card")[questionCount];
    let options = question.querySelectorAll(".btnOpt");

    if(userAnswer === questions[questionCount].correct){
        e.target.classList.add("bg-green-200")
        scoreCount++
    }else{
        e.target.classList.add("bg-red-200");
        // for making the correct option
        options.forEach((item) => {
            if (item.innerText == questions[questionCount].correct) {
              item.classList.add("bg-green-200");
            }
          });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((item) => {
    item.disabled = true;
  });
}

// initial setup
function initial(){
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 10;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);

}

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count} s`;
      if (count == 0) {
        clearInterval(countdown);
        nextQuestion();
      }
    }, 1000);
  };

  // play again
 function restartGame(){
    initial();
    scoreSection.classList.add("hidden");
    showQuiz()
  }

// bye section
function closeAndBye(){
    scoreSection.classList.add("hidden");
    byeSection.classList.remove("hidden")
}
