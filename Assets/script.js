//global variable declarations
var launcherEl = document.querySelector("#launcher");
var highScoresList = document.querySelector("#high-scores");
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

//Quiz function
var quizHandler = function() {
    
    //Display Instructions
    window.alert("Hello world");

    //loop to iterate through each question in the questionContentArray

    //create Container to hold elements 
    var questionBox = document.createElement("div");
    questionBox.className = "question-box";
    questionBox.id = "question-box";
    document.getElementById("quiz").appendChild(questionBox);

    var questionDisplay = document.createElement("h2");
    var questionDisplayText = document.createTextNode(questionContent[0].question);
    questionDisplay.appendChild(questionDisplayText);
    
    document.getElementById("question-box").appendChild(questionDisplay);


    //remove start quiz button
    launcher.remove();


    // var questionBoxEl = document.createElement("div");
    // questionBoxEl.classname = "question-box";
    // questionBoxEl.innerHTML = "<h3> Are you there? </h3>";
    // questionBoxEl.appendChild("quiz");

    // var questionDisplay = document.createElement("h2");
    // questionDisplay.className = "question-display"; 
    // questionBoxEl.appendChild(questionDisplay);
    // questionDisplay.setAttribute("question-id", questionCounter)

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

