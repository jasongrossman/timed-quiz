//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
var clockStart = 50;
var countdown = 0;
var questionCounter = 0;
var score = [];
var guess = "";
var username = "";
var questionBox = null;
// var score = [];
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
        incorrectA: "Bjorn",
        incorrectB: "Mr. Frog",
        incorrectC: "Dr. Pepper",
        solution: "Jason"
    },
    {
        question: "Will we make it to the next question?",
        incorrectA: "It's not looking likely",
        incorrectB: "Maybe if you asked for directions...",
        incorrectC: "Isn't this the last question?",
        solution: "Of course we will! Just trust me"
    },
    {
        question: "Is there a light at the end of this tunnel?",
        incorrectA: "I am the light. What you seek are answers",
        incorrectB: "Life is but a dreary road, look not for the light.",
        incorrectC: "Tunnels are mere constructs of man. Light is eternal",
        solution: "yeah, there are only 5 questions."
    }
];
var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
console.log(savedScores);


    //timer function that counts down when quiz begins.
    var timer = function() {
        var clockDisplay = document.createElement("h3");
        clockDisplay.textContent = clockStart;
        document.getElementById("clock").appendChild(clockDisplay);
        countdown = setInterval(() => {
            clockDisplay.textContent = clockStart--;
            if (clockStart <=0) {
                clearInterval(countdown);
                quizcomplete();
            }   
        }, 1000);
    }
    
    var quizcomplete = function() {
        var finalScore = document.createElement("div");
        finalScore.className = "final-score";
        finalScore.id = "final-score"
        document.getElementById("quiz").appendChild(finalScore)
        scoreTotal = document.createElement("h3");
        scoreTotal.innerText = "Your score is " + clockStart + " points.";
        document.getElementById("final-score").appendChild(scoreTotal)
        clearInterval(countdown);
        questionBox.remove();
        saveHighScore();

    }
    //save high score at end of quiz complete function
    var saveHighScore = function() {
        savedScores.push(clockStart);
        // score = {
        //     points: clockStart,
        //     name: username
        // }
        // savedScores.push(score);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));

    };

    //when View High Scores is clicked, start displayHighScores function
    var displayHighScores = function() {
        highScoresList.removeEventListener("click", displayHighScores);
        savedScores.sort((a, b) => b-a);
        console.log(savedScores);
        var scoreList = document.createElement("ol");
        scoreList.textContent = "List of High Scores";
        scoreList.className = "high-score-table";
        scoreList.id = "scoreList";
        document.getElementById("high-score-list").appendChild(scoreList);

        for (i = 0; i < savedScores.length; i++) {
          var scorelistItem = document.createElement("li");
          scorelistItem.textContent = savedScores[i];
          document.getElementById("scoreList").appendChild(scorelistItem);
        };



        // alert("Let's see all the top scores:");
        // var scoreList = document.createElement("ul");
        // scoreList.textContent = "List of High Scores";
        // scoreList.className = "high-score-table";
        // scoreList.id = "scoreList";
        // document.getElementById("high-score-list").appendChild(scoreList);
        // var savedScores = localStorage.getItem("clockStart");
        // console.log(savedScores);
        // alert(savedScores);
        // // // if there are no scores, set scores to an empty array and return out of the function
        // // if (!clockStart) {
        // //   return false;
        // // }
      
        // // parse into array of objects
        // savedScores = JSON.parse(savedScores);
      
    }
    var nextquestion = function() {
        questionBox.remove();
        questionCounter++;
        console.log(questionCounter);
        if (questionCounter >= questionContent.length) {
            quizcomplete();
        }
        else { 
        quizHandler();
        }
    };

//Quiz function
var quizHandler = function() {
    
    //Display Instructions
    // window.alert("Welcome to the quiz. You have 60 seconds to answer all questions. For every wrong answer, you will lose 5 seconds of time. Your high score is equal to the number of seconds remaining when you finish the quiz!");
    // window.confirm("Are you ready?");



    //create Container to hold elements 
    questionBox = document.createElement("div");
    questionBox.className = "question-box";
    questionBox.id = "question-box";
    document.getElementById("quiz").appendChild(questionBox);

    //shuffle choice options in random order
    let options = Object.entries(questionContent[questionCounter]);
    const displayQuestion = options[0];
    let questionChoices = _.shuffle(options.slice(1));
    console.log({questionChoices, displayQuestion});
    // let questionChoicesCounter = 0;

    //create H2 element within div to hold question text
    var questionDisplay = document.createElement("h2");
    var questionDisplayText = document.createTextNode(displayQuestion[1]);
    questionDisplay.className = "question-header";
    questionDisplay.appendChild(questionDisplayText);
    document.getElementById("question-box").appendChild(questionDisplay);

    //add list item answer options to div element as button
    var choiceOptionA = document.createElement("button");
    choiceOptionA.className = "choice-item";
    const optionA = questionChoices[0];
    choiceOptionA.textContent = optionA[1];
    document.getElementById("question-box").appendChild(choiceOptionA);

    var choiceOptionB = document.createElement("button");
    choiceOptionB.className = "choice-item";
    const optionB = questionChoices[1];
    choiceOptionB.textContent = optionB[1];
    // choiceOptionB.textContent = questionContent[questionCounter].incorrectB;
    document.getElementById("question-box").appendChild(choiceOptionB);

    var choiceOptionC = document.createElement("button");
    choiceOptionC.className = "choice-item";
    const optionC = questionChoices[2];
    choiceOptionC.textContent = optionC[1];

    // choiceOptionC.textContent = questionContent[questionCounter].incorrectC;
    document.getElementById("question-box").appendChild(choiceOptionC);

    var choiceOptionD = document.createElement("button");
    choiceOptionD.className = "choice-item";
    const optionD = questionChoices[3];
    choiceOptionD.textContent = optionD[1];
    // choiceSolution.textContent = questionContent[questionCounter].solution;
    document.getElementById("question-box").appendChild(choiceOptionD);
   
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
    choiceOptionD.addEventListener("click", function(){
        guess = choiceOptionD.textContent;
        checkAnswer();
    });
    
     //checks clicked answer and compares to correct answer
     var checkAnswer = function() { 
        console.log(guess);
        if (guess === questionContent[questionCounter].solution) {
            alert(guess + " is correct!");
            setTimeout(() => {
                nextquestion();
            }, 500);
        }
        else {
            alert("HAHAHA nice try but no.");
            clockStart = clockStart -5;
            setTimeout(() => {
                nextquestion();
            }, 500);
        }
    }
}
    //create Question element


    //Create Answer Buttons

    
    //Begin Countdown Timer

    
    //Pull question #1 from QuestionContent Array, and display all values

    //if function to validate correct answer


//event listeners
launcherEl.addEventListener("click", function() {
    //remove start button
    launcher.remove();
     //prompt for user name
    username = prompt("Please enter your username for the game");

    //start timer:
    timer();
    //start quiz
    quizHandler();
});

highScoresList.addEventListener("click", displayHighScores);
