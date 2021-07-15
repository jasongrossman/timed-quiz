//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
var clockStart = 5;
var questionCounter = 0;
var guess = "";
var questionContent = [ 
    {
        question: "Does this work?",
        incorrectA: "Doubt it",
        incorrectB: "lmao no",
        incorrectC: "r u srs?",
        solution: "Yes!"
    },
    {
        question: "Who are you?",
        answerA: "Bjorn",
        answerB: "Mr. Frog",
        answerC: "Dr. Pepper",
        solution: "Jason"
    }
];

var solutions = [
    {
       question: 1,
       solution: questionContent[0].answerB
    },
    {
        question: 2,
        solution: questionContent[1].answerA
    }
];

    //timer function that counts down when quiz begins.
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
    var choiceOptionA = document.createElement("button");
    choiceOptionA.className = "choice-item";
    choiceOptionA.textContent = questionContent[0].incorrectA;
    document.getElementById("question-box").appendChild(choiceOptionA);

    var choiceOptionB = document.createElement("button");
    choiceOptionB.className = "choice-item";
    choiceOptionB.textContent = questionContent[0].incorrectB;
    document.getElementById("question-box").appendChild(choiceOptionB);

    var choiceOptionC = document.createElement("button");
    choiceOptionC.className = "choice-item";
    choiceOptionC.textContent = questionContent[0].incorrectC;
    document.getElementById("question-box").appendChild(choiceOptionC);

    var choiceSolution = document.createElement("button");
    choiceSolution.className = "choice-item";
    choiceSolution.textContent = questionContent[0].solution;
    document.getElementById("question-box").appendChild(choiceSolution);

    //remove start quiz button
    launcher.remove();



    
    //Add event listeners on buttons to determine correct answers
    choiceOptionA.addEventListener("click", function(){
        guess = choiceOptionA.textContent;
        checkAnswer();
    });
    choiceOptionB.addEventListener("click", function(){
        guess = choiceOptionB.textContent;
        checkAnswer();
    });
    
    choiceOptionC.addEventListener("click", function(){
        guess = choiceOptionC.textContent;
        checkAnswer();
    });    
    choiceSolution.addEventListener("click", function(){
        guess = choiceSolution.textContent;
        checkAnswer();
    });
    
     //checks clicked answer and compares to correct answer
     var checkAnswer = function() { 
        console.log(guess);
        if (guess.localeCompare(choiceSolution.textContent) == 0) {
            alert(guess + " is correct!");
            console.log(guess);
            console.log(choiceSolution.textContent);
        }
        else {
            alert("HAHAHA nice try but no.");
            console.log(guess);
            console.log(choiceSolution);

        }
    }

}
    //create Question element


    //Create Answer Buttons

    
    //Begin Countdown Timer

    
    //Pull question #1 from QuestionContent Array, and display all values

    //if function to validate correct answer

//High Scores List
var displayHighScores = function() {
    window.alert("You are good at this game!");
}


//event listeners
launcherEl.addEventListener("click", quizHandler);
highScoresList.addEventListener("click", displayHighScores);

