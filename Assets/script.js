//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
var clockStart = 5;
var questionCounter = 0;
var questionContent = [ 
    {
        question: "Does this work?",
        answerA: "Doubt it",
        answerB: "Yes!",
        answerC: "lmao no",
        answerD: "r u srs?",
    },
    {
        question: "Who are you?",
        answerA: "Jason",
        answerB: "Bjorn",
        answerC: "Mr. Frog",
        answerD: "Dr. Pepper",
    }
];

var solutions = [
    {
       question: 1,
       solution: "Yes!"
    },
    {
        question: 2,
        solution: "Jason"
    }
];

    var timer = function() {
        var clockDisplay = document.createElement("h3");
        clockDisplay.textContent = clockStart;
        document.getElementById("clock").appendChild(clockDisplay);
        var countdown = setInterval(() => {
            clockDisplay.textContent = clockStart--;
            if (clockStart <0) {
                clearInterval(countdown);
            }   
        }, 1000);

    }

//Quiz function
var quizHandler = function() {
    
    //Display Instructions
    // window.alert("Welcome to the quiz. You have 60 seconds to answer all questions. For every wrong answer, you will lose 5 seconds of time. Your high score is equal to the number of seconds remaining when you finish the quiz!");
    // window.confirm("Are you ready?");

    //start timer:
    timer();
    //loop to iterate through each question in the questionContentArray

    //create Container to hold elements 
    var questionBox = document.createElement("div");
    questionBox.className = "question-box";
    questionBox.id = "question-box";
    document.getElementById("quiz").appendChild(questionBox);

    //create H2 element within div to hold question text
    var questionDisplay = document.createElement("h2");
    var questionDisplayText = document.createTextNode(questionContent[0].question);
    questionDisplay.className = "question-header"
    questionDisplay.appendChild(questionDisplayText);
    document.getElementById("question-box").appendChild(questionDisplay);

    //add list item answer options to div element as button
    var choiceOptionA = document.createElement("button")
    choiceOptionA.className = "choice-item";
    choiceOptionA.textContent = questionContent[0].answerA;
    document.getElementById("question-box").appendChild(choiceOptionA);

    var choiceOptionB = document.createElement("button")
    choiceOptionB.className = "choice-item";
    choiceOptionB.textContent = questionContent[0].answerB;
    document.getElementById("question-box").appendChild(choiceOptionB);

    var choiceOptionC = document.createElement("button")
    choiceOptionC.className = "choice-item";
    choiceOptionC.textContent = questionContent[0].answerC;
    document.getElementById("question-box").appendChild(choiceOptionC);

    var choiceOptionD = document.createElement("button")
    choiceOptionD.className = "choice-item";
    choiceOptionD.textContent = questionContent[0].answerD;
    document.getElementById("question-box").appendChild(choiceOptionD);

    //remove start quiz button
    launcher.remove();

    //create Question element
    console.log(questionContent[0].question);

    //Create Answer Buttons
    console.log(solutions[0].solution);
    
    //Begin Countdown Timer

    
    //Pull question #1 from QuestionContent Array, and display all values

    //if function to validate correct answer


}

//High Scores List
var displayHighScores = function() {
    window.alert("You are good at this game!");
}

//event listeners
launcherEl.addEventListener("click", quizHandler);
highScoresList.addEventListener("click", displayHighScores);

