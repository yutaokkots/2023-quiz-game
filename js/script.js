// -- constants -- //
// formatt: [[question],[correctAnswer, incorrectAnswer, incorrectAnswer, . . . ], (1) single correct answer or (0) all answers correct]
const QUESTIONS_PYTHON = [
    ["An array is to an object, as list is to a(n)_______.", ["dictionary","reference","glossary","object","array","microarray"], 1],
    ["A template literal is to Javascript as _______ is to Python.", ["f-string", "g-string","template-literal","string-literal","string-template","variable-template"], 1],
    ["This symbol or operator represents a comment in JS, and a floor division in Python", ["//","@@", "**", "##","::",".."], 1],
    ["A ______ returns the remainder of a division operation", ["%","/?","&|","$!","$","&"], 1],
    ["In order to iterate with a key:index pair, the ______ function may be used in Python", ["enumerate()","itemize()","index()","print()","for...of..."], 1],
    ["What is the name of the immutable data type out of the three listed here?: {'1':'2'} or (1,2) or [1,2]", ["tuple","buccal","ducal","nuptial","list","array","object","dictionary"], 1],
    ["When creating a Class, the following is used to 'construct' the class", ["__init__","constructor()","initializer()","__start__","def"], 1],
    ["This referential key is used inside a Class in Python",["self","this","my","at","from"], 1],
    ["What is the result of this conditional statement in Python?: if 2 == '2':",["False","True","falsey","truthy","undefined","null"], 1],
    ["Space or tab?", ["space","tab","space-ish","tab-ish"], 0],
    ["Variables in Python are written in ______-case",["snake","camel","lisp","flat","horse","worm"], 1],
    ["Which of the following is not a primitive data type in Python (For example, BigInt does not exist in Python)",["null","int","str","float","bool"], 1],
    ["In conditional statements, which of the following is not a valid command?",["else if","elif","else","if"], 1]
]
  
const QUESTIONS_INDIA = {

}

// -- state variables-- //
// gameStatus keeps the score of the current 
let questionSet;
let gameStatus;
let quizQuestionOrder;
let quizQuestionInfo;

// -- cached elements-- //
const mainElement = document.querySelector("main")


// -- addEventListener() -- //
mainElement.addEventListener('click', (evt) => {
    console.log(evt.target)
    console.log(evt.target.tagName)
    loadNewQuestionsAndAnswers()
    render()
})


init();
//

// returns true or false
function checkAnswer(){
};

    // 'gameStatus' -> [question number / total question / question correct].
// calulatePercentageWin() -> calculates the percentage of wins for the game, also rounds the number
function calulatePercentageWin(){
    return Math.ceil(gameStatus[2]/gameStatus[1]*100);
};

// initializeGame() -> randomizes the order of the questions that will be asked to the user.
function initializeGame(){
    // First, obtain the length of the questions library
    const questionTotal = questionSet.length
    //     and create an array of numbers, from 0 -> questionTotal, inside an array called 'questionCounter',
    let questionCounter = [];
    for (let i=questionTotal-1;i>=0;i--){
        questionCounter.push(i);
    };    
    //     and randomize that list of numbers, and save it to the global array called 'quizQuestionOrder'. 
    for (let i=questionCounter.length-1;i>=0; i--){
        let n = Math.floor(Math.random()*i);
        quizQuestionOrder.push(questionCounter.splice(n, 1)[0]);
        };
    // Second, updates the global array 'gameStatus', with the above information, 
    //     by updating total number of questions, located at index 1. 
    gameStatus.splice(1, 1, questionTotal);
    console.log(gameStatus)
}

// loadNewQuestion() -> loads the new question into the 'gameStatus' global variable.    
function loadNewQuestion(){
    // For initialization of the game, the first question is assigned an index of 0 in the global variable quizQuestionOrder. 
    // In order not to reassign the first question, if gameStatus[0] = 0, skip this step .
    // gameStatus[0] contains information about which question is being asked from the global array, 'quizQuestionOrder'
    // the following if statement updates 'gameStatus' at index = 0 to the question number. 
    if (gameStatus[0] !== 0){
        let questionNumber = quizQuestionOrder[gameStatus[0]+1]
        gameStatus.splice(0, 1, questionNumber)
    }; 
};

// loadNewQuestionsAndAnswers() -> loads the new possible multiple choice Q+A's into DOM elements
function loadNewQuestionsAndAnswers(){
    // The new question and answer are displayed in three areas. 
    // The first area shows the question number. 
    let titleElement = document.querySelector("#number")
    let newTitle = document.createElement("h3")
    newTitle.innerText = `Question ${gameStatus[0]+1}`
    titleElement.appendChild(newTitle)

    let questionElement = document.querySelector("#question")
    let newQuestion = document.createElement("h4")
    newQuestion.innerText = questionSet[quizQuestionOrder[gameStatus[0]]][0]
    questionElement.appendChild(newQuestion)

    let answer1DivElement = document.querySelector("#answer-1")
    let answer1El = document.createElement("p")
    answer1El.innerText = questionSet[quizQuestionOrder[gameStatus[0]]][1][0]
    answer1DivElement.appendChild(answer1El)

    let answer2DivElement = document.querySelector("#answer-2")
    let answer2El= document.createElement("p")
    answer2El.innerText = questionSet[quizQuestionOrder[gameStatus[0]]][1][1]
    answer2DivElement.appendChild(answer2El)

    let answer3DivElement = document.querySelector("#answer-3")
    let answer3El = document.createElement("p")
    answer3El.innerText = questionSet[quizQuestionOrder[gameStatus[0]]][1][2]
    answer3DivElement.appendChild(answer3El)

    let answer4DivElement = document.querySelector("#answer-4")
    let answer4El = document.createElement("p")
    answer4El.innerText = questionSet[quizQuestionOrder[gameStatus[0]]][1][3]
    answer4DivElement.appendChild(answer4El)


};


function clearBoard(){


};
    
// renderBoard() -> takes the global variables, 'gameStatus' and 'quizQuestionOrder' to render the gameboard
function renderBoard(){
    // This 'percentageOfWins' represents the whole number percentage of the rate of the correct answer. 
    let percentageOfWins = calulatePercentageWin()

    let newQuestion = document.createElement("h4")
    let answer = document.createElement("p")

    QUESTIONS_PYTHON.length
    console.log()

};


function render(){
    loadNewQuestion()
    clearBoard();
    
    renderBoard();

}



function init (){
    questionSet = QUESTIONS_PYTHON
    // gameStatus- question number/ total question / correct answer location /  question correct
    gameStatus = [0,0,0,0]
    quizQuestionOrder = [];  
    quizQuestionInfo = []
    initializeGame();
    
    render();
};




// init() initialize renderboard

//listens for mouseclick,
// render function -> displays answer,  checks answer, calculates, shows score clears board, 
// displays answer

// listens for the mouseclick and reports back
// checks for the answer
// modifies/renders the board
//prints out the percentage win of the quiz game
// round the number
// prints it out on the bottom

