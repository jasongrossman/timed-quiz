//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
var clockStart = 50;
var countdown = 0;
var questionCounter = 0;
var guess = "";
var questionBox = null;
var score = [];
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
            if (clockStart <0) {
                clearInterval(countdown);
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
        saveHighScore();

    }
    //save high score at end of quiz complete function
    var saveHighScore = function() {
        savedScores.push(clockStart);
        // score = {
        //     points: clockStart,
        //     name: "placeholder"
        // }
        // savedScores.push(score);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));

    };

    //when View High Scores is clicked, start displayHighScores function
    var displayHighScores = function() {
        console.log(savedScores);

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
      
        // // // loop through savedTasks array
        // for (var i = 0; i < savedScores.length; i++) {
        //   // create score list element and pass each score through
        //   var score = savedScores[i];
        //   var scorelistItem = document.createElement("li");
        //   document.getElementById("scoreListItem").appendChild(score);
        //   document.getElementById("scoreList").appendChild(scorelistItem);
        //   console.log(score);
        // }
      
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


    //loop to iterate through each question in the questionContentArray

    //create Container to hold elements 
    questionBox = document.createElement("div");
    questionBox.className = "question-box";
    questionBox.id = "question-box";
    document.getElementById("quiz").appendChild(questionBox);

    //create H2 element within div to hold question text
    var questionDisplay = document.createElement("h2");
    var questionDisplayText = document.createTextNode(questionContent[questionCounter].question);
    questionDisplay.className = "question-header"
    questionDisplay.appendChild(questionDisplayText);
    document.getElementById("question-box").appendChild(questionDisplay);

    //add list item answer options to div element as button
    var choiceOptionA = document.createElement("button");
    choiceOptionA.className = "choice-item";
    choiceOptionA.textContent = questionContent[questionCounter].incorrectA;
    document.getElementById("question-box").appendChild(choiceOptionA);

    var choiceOptionB = document.createElement("button");
    choiceOptionB.className = "choice-item";
    choiceOptionB.textContent = questionContent[questionCounter].incorrectB;
    document.getElementById("question-box").appendChild(choiceOptionB);

    var choiceOptionC = document.createElement("button");
    choiceOptionC.className = "choice-item";
    choiceOptionC.textContent = questionContent[questionCounter].incorrectC;
    document.getElementById("question-box").appendChild(choiceOptionC);

    var choiceSolution = document.createElement("button");
    choiceSolution.className = "choice-item";
    choiceSolution.textContent = questionContent[questionCounter].solution;
    document.getElementById("question-box").appendChild(choiceSolution);

   
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
            choiceSolution.style.backgroundColor = "#42f560";
            setTimeout(() => {
                nextquestion();
            }, 500);
    
        }
        else {
            alert("HAHAHA nice try but no.");
            clockStart = clockStart -5;
            console.log(guess);
            console.log(choiceSolution);
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
    //start timer:
    timer();
    //start quiz
    quizHandler();
});

highScoresList.addEventListener("click", displayHighScores);
