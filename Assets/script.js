//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
var clockStart = 60;
var countdown = 0;
var questionCounter = 0;
var score = [];
var guess = "";
var username = "";
var questionBox = null;

//array containing all questions, choices, and solutions
var questionContent = [ 
    {
        question: "What does the '++' do when added to the end of a variable containing a number?",
        incorrectA: "Double it",
        incorrectB: "Add these together",
        incorrectC: "Increment by 2",
        solution: "Increment by 1"
    },
    {
        question: "What does [] do?",
        incorrectA: "Used to contain a function",
        incorrectB: "Used at the end of a function declaration",
        incorrectC: "Links to other documents",
        solution: "Used to contain arrays"
    },
    {
        question: "What is a global variable?",
        incorrectA: "A variable that is universally recognized around the world",
        incorrectB: "A variable declared inside a function, that can be used anywhere in that function",
        incorrectC: "A variable that can be used both in JavaScript as well as other programming languages",
        solution: "A variable declared outside of any function, that can be called from anywhere"
    },
    {
        question: "What is local storage?",
        incorrectA: "Saved interactions and data that is deleted when the session ends",
        incorrectB: "Private and sensitive data that cannot be retrieved by third party software",
        incorrectC: "The same as cache and cookies",
        solution: "Saved interactions and data that persists even after the session has ended"
    },
    {
        question: "What method is used to add an element to another?",
        incorrectA: "appendParent",
        incorrectB: "addChild",
        incorrectC: "addObject",
        solution: "appendChild"
    }
];

    //save scores to local storage
    var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    console.log(savedScores);

    //timer function that counts down when quiz begins.
    var timer = function() {
        var clockDisplay = document.createElement("h3");
        clockDisplay.className = "clock-display";
        // clockDisplay.textContent = "Time Remaining:" + clockStart;
        document.getElementById("clock").innerText = "Time Remaining:";
        document.getElementById("clock").appendChild(clockDisplay);
        countdown = setInterval(() => {
            clockDisplay.textContent = clockStart--;
            if (clockStart <=0) {
                clearInterval(countdown);
                quizcomplete();
            }   
        }, 1000);
    }
    
    //upon completing all questions/time expiration, run quiz complete function
    var quizcomplete = function() {

        //create a display for final score and add elements to populate.
        var finalScore = document.createElement("div");
        finalScore.className = "final-score";
        finalScore.id = "final-score"
        document.getElementById("quiz").appendChild(finalScore)
        scoreTotal = document.createElement("h3");
        scoreTotal.innerText = "Your score is " + clockStart + " points.";
        document.getElementById("final-score").appendChild(scoreTotal);

        //stop the clock, remove the quiz elements, and save high score
        clearInterval(countdown);
        questionBox.remove();
        saveHighScore();

        //provide option to play again
        var playAgain = document.createElement("button");
        playAgain.className = "play-again";
        playAgain.innerText = "Play Again";
        document.getElementById("final-score").appendChild(playAgain);
        playAgain.addEventListener("click", function() {    
        
            //remove play again button
            playAgain.remove();
            finalScore.remove();
        
            //prompt for user name
            username = prompt("Please enter your name to go with your score into the high score records:");
        
            //start timer:
            clockStart = 60;
            timer();

            //start quiz
            questionCounter = 0;
            quizHandler();
        });
    
    }
    //save high score at end of quiz complete function
    var saveHighScore = function() {
        score = {
            points: clockStart,
            name: username
        }
        savedScores.push(score);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
    };

    //when View High Scores is clicked, start displayHighScores function
    var displayHighScores = function() {
        // remove event handler so that it can only display once and not stack
        highScoresList.removeEventListener("click", displayHighScores);

        //sort scores based on highest points to lowest
        savedScores.sort((a, b) => b.points - a.points);
        console.log(savedScores);

        //if no high scores, alert that there are no scores
        if (!savedScores[0]) {
            alert("There are no scores to display");
            highScoresList.addEventListener("click", displayHighScores);
        }
        else {
        //create ordered list to contain scores
        var scoreList = document.createElement("ol");
        scoreList.textContent = "List of High Scores";
        scoreList.className = "high-score-table";
        scoreList.id = "scoreList";
        document.getElementById("high-score-list").appendChild(scoreList);

        //loop through local storage to populate high scores as list items
        for (i = 0; i < savedScores.length; i++) {
          var scorelistItem = document.createElement("li");
          scorelistItem.className = "score-entry";
          scorelistItem.textContent = savedScores[i].points + " - " + savedScores[i].name;
          document.getElementById("scoreList").appendChild(scorelistItem);
        };
        
        //create go back button to close high score list
        var goBack = document.createElement("button");
        goBack.className = "go-back";
        goBack.textContent = "Close High Scores";
        document.getElementById("scoreList").appendChild(goBack);   
        goBack.addEventListener("click", function() {
        scoreList.remove();
        highScoresList.addEventListener("click", displayHighScores);

        }); 

        //create clear history button
        var clearHistory = document.createElement("button");
        clearHistory.className = "clear-history";
        clearHistory.textContent = "Clear History";
        document.getElementById("scoreList").appendChild(clearHistory);   
        
        //clear history function to remove high scores from local storage
        clearHistory.addEventListener("click", function() {
            savedScores = [];
            localStorage.setItem("savedScores", JSON.stringify(savedScores));     
            scoreList.remove();           
            highScoresList.addEventListener("click", displayHighScores);
        }); 
        }
    }

    //upon answering a question, progress to the next question until you reach the end of the question content array
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
    document.getElementById("question-box").appendChild(choiceOptionB);

    var choiceOptionC = document.createElement("button");
    choiceOptionC.className = "choice-item";
    const optionC = questionChoices[2];
    choiceOptionC.textContent = optionC[1];
    document.getElementById("question-box").appendChild(choiceOptionC);

    var choiceOptionD = document.createElement("button");
    choiceOptionD.className = "choice-item";
    const optionD = questionChoices[3];
    choiceOptionD.textContent = optionD[1];
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
    
     //checks clicked answer and compares to correct answer. deducts 5 seconds for incorrect answer
     var checkAnswer = function() { 
        console.log(guess);
        if (guess === questionContent[questionCounter].solution) {
            alert("Correct!");
            setTimeout(() => {
                nextquestion();
            }, 500);
        }
        else {
            alert("Sorry, that's incorrect!");
            clockStart = clockStart -5;
            setTimeout(() => {
                nextquestion();
            }, 500);
        }
    }
}

//event listener to start game
launcherEl.addEventListener("click", function() {
    //remove start button
    launcher.remove();

    //Display Instructions
    window.alert("Welcome to the quiz. You have 60 seconds to answer all questions. For every wrong answer, you will lose 5 seconds of time. Your high score is equal to the number of seconds remaining when you finish the quiz!");

    //prompt for user name
    username = prompt("Please enter your name to go with your score into the high score records:");

    //start timer:
    timer();
    //start quiz
    quizHandler();
});

//event listener to display high scores
highScoresList.addEventListener("click", displayHighScores);
