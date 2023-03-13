// -- constants -- //
// format of questions and answers: [[question],[correctAnswer, incorrectAnswer, incorrectAnswer, . . . ], (1) single correct answer or (0) all answers correct]
const QUESTIONS_PYTHON = [
    ["An array is to an object, as list is to a(n)_______.", ["dictionary","reference","glossary","object","array","microarray"], 1],
    ["A template literal is to Javascript as _______ is to Python.", ["f-string", "g-string","template-literal","string-literal","string-template","variable-template"], 1],
    ["This symbol or operator represents a comment in JS, and a floor division in Python", ["//","@@", "**", "##","::",".."], 1],
    ["A ______ returns the remainder of a division operation", ["%","/?","&|","$!","$","&"], 1],
    ["In order to iterate with a key:index pair, the ______ function may be used in Python", ["enumerate()","itemize()","index()","print()","for...of..."], 1],
    ["What is the name of the immutable data type out of the three listed here?: {'1':'2'} or (1,2) or [1,2]", ["tuple","buccal","ducal","nuptial","list","array","object","dictionary"], 1],
    ["When creating a Class, the following unique key word is used to 'construct' the class", ["__init__","constructor()","initializer()","__start__","def"], 1],
    ["This referential key is used inside a Class in Python",["self","this","my","at","from"], 1],
    ["What is the result of this conditional statement in Python?: if 2 == '2':",["False","True","falsey","truthy","undefined","null"], 1],
    ["Space or tab?", ["space","tab","space-ish","tab-ish"], 0],
    ["Variables in Python are written in ______-case",["snake","camel","lisp","flat","horse","worm"], 1],
    ["Which of the following is not a primitive data type in Python (For example, BigInt does not exist in Python)",["null","int","str","float","bool"], 1],
    ["In conditional statements, which of the following is not a valid command?",["else if","elif","else","if"], 1]
]
  
const QUESTIONS_RANDOM = [
    ["Who dropped the pot of chili?", ["Kevin", "Michael", "Dwight", "Angela"], 1],
    ["Who shot first?", ["Han", "Ben", "Rey", "Galen"], 1],
    ["Who jumped off the building?", ["Denholm", "Roy", "Moss","Jen"], 1],
    ["Who started the fire?", ["Ryan", "Creed", "Jim", "Nick"], 1]
]

// -- state variables-- //
let gameStatus;             // 'gameStatus' keeps the current score, and the overall question number user is on
let questionSet;            // 'questionSet' references the const Library that holds Q+As
let quizQuestionsShuffled;  // 'quizQuestionsShuffled' includes an array of the current questionSet, randomized

// -- cached elements-- //
const mainElement = document.querySelector("main")
const titleElement = document.querySelector("#number")
const questionElement = document.querySelector("#question")
let answerDivElements = document.getElementsByClassName(".answer")


// -- addEventListener() -- //
mainElement.addEventListener('click', controller)

function controller(evt) {
    // guard -> ignore undefined areas
    if (evt.target.className === undefined){
        return;
    }
    // If click is on one of the answers, change 'gameStatus[2]' to the user's choice.
    let selection;
    if (evt.target.className === "answer" || evt.target.tagName === "SPAN"){
        if (evt.target.tagName === "SPAN"){
            selection = +evt.target.id
        }
        selection = +evt.target.id
        gameStatus.splice(2, 1, selection)
    }
    displayChoiceFeedback()

    // In the event of a button click, the game progresses. (1) Feedback->(if gameStatus[5]=-1); (2) Next Question->(if gameStatus[5]=+1)
    if (evt.target.id === "button"){
        // If the game is on the feeback screen, change the gameStatus[5] to next question.
        let currentSelection = gameStatus[5]
        if (gameStatus[5] < 0){
            if (gameStatus[2] === null){
                return;
            }
            gameStatus.splice(5, 1, currentSelection * -1)
            // Updates 'gameStatus[3]' containing the userScore if the answer is correct. 
            if (checkAnswer() === true){
                userScore = gameStatus[3]
                gameStatus.splice(3, 1, userScore+1)
                console.log("true")
            } else{
                console.log("false")
                return;
            }
            renderScore()

        // if 1, then on answer page
        } else if (gameStatus[5] > 0) {
            clearChoices()
            //updates to the next question
            gameStatus.splice(2, 1, null)   
            gameStatus.splice(5, 1, currentSelection * -1)
            let currentQuestion = gameStatus[0]
            gameStatus.splice(0, 1, currentQuestion+1)
            render()
        }
    }
}


// -- functions -- //
init();
//

// Compares 'gameStatus[1]'(corr. answer) and 'gameStatus[1]' (user choice), and returns true or false
function checkAnswer(){
    return gameStatus[1] === gameStatus[2];
};

// // questionOrAnswerPage -> changes the 'gameStatus[5]' either + or - for next question
// function questionOrAnswerPage(){
//     let nextQuestion = gameStatus[5]*-1
//     gameStatus.slice(5, 1, nextQuestion)
// };

// 'gameStatus' -> [question number / correct answer / user choice / questions correct / total question / Q or A page].
// calculatePercentageWin() -> calculates the percentage of wins for the game, also rounds the number
function calculatePercentageWin(){
    return Math.ceil(gameStatus[3]/gameStatus[1]*100);
};

// orderRandomizer() -> inputs an array, 'arr', and returns a new array, ordered randomly.
function orderRandomizer(arr){
    // Create a new array that is randomized, and outputs the randomized array,
    let newOrder = []
    for (let i=arr.length;i>=0; i--){
        let n = Math.floor(Math.random()*i);
        newOrder.push(arr.splice(n, 1)[0]);
        };
    return newOrder
};

// initializeGame() -> randomizes the order of the questions that will be asked to the user. 
function initializeGame(){
    // First, shuffle the original library, 'questionSet',
    // and save it to the global array called 'quizQuestionsShuffled', using the function, orderRandomizer().
    quizQuestionsShuffled = orderRandomizer(questionSet)
    // Second, updates the global array 'gameStatus', with the total number of questions in the question set, 
    // by updating total number of questions, located at index 4 of 'gameStatus'. 
    questionTotal = quizQuestionsShuffled.length
    gameStatus.splice(4, 1, questionTotal);
}

// loadNewQuestionsAndAnswers() -> loads the new Question and possible multiple choice A's into DOM elements
function loadNewQuestionsAndAnswers(){

    // The variable 'currentQuestion' ultimately references the index of the const Library,
    // while 'gameStatus[0]' references the index = 0 item of that list. 
    let currentQuestion = quizQuestionsShuffled[gameStatus[0]]
    // The new question and answer are displayed in three areas. 
    // 1) The first area shows the question number. 
    //              let titleElement = document.querySelector("#number")
    if (titleElement.hasChildNodes() === true){
        titleElement.removeChild(titleElement.firstChild)
    }   
    let newTitle = document.createElement("h3")
    newTitle.innerText = `Question ${gameStatus[0]+1}`
    titleElement.appendChild(newTitle)
    // 2) The second area shows the question. 
    //              let questionElement = document.querySelector("#question")
    if (questionElement.hasChildNodes() === true){
        questionElement.removeChild(questionElement.firstChild)
    }   
    let newQuestion = document.createElement("h4")
    newQuestion.innerText = currentQuestion[0]
    questionElement.appendChild(newQuestion)

    // Some questions have more than four possible answers, although only four are shown. Only one answer is true. 
    // Therefore, the following randomizes the false answers, and randomizes it with the correct answer.
    // When the user looks at the trivia answers, the choices are randomly placed, yet contain a single true answer.
    // a), 'allIncorrectAns' is a new array of possible false answers. 
    let allIncorrectAns = currentQuestion[1].slice(1, currentQuestion[1].length);
    // b), the following steps randomize the order of the false answer, and slices 3 out.
    let allIncorrectAnsRand = orderRandomizer(allIncorrectAns)
    let penultimateArr = allIncorrectAnsRand.slice(0, 3);
    // c), the true answer is included with the three false answers, and randomized again.
    penultimateArr.push(currentQuestion[1][0])
    let ultimateArr = orderRandomizer(penultimateArr)
    ultimateArr.pop()
    // d), the index of the correct answer from the 'ultimateArr' array is recorded in 'gameStatus[1]'
    let correctAnswerIndex = ultimateArr.indexOf(currentQuestion[1][0])
    gameStatus.splice(1, 1, correctAnswerIndex)
    // 3) The third area shows the answers, randomized. 
    let letterArr = ['a', 'b', 'c', 'd']
    //let answerDivArray = Array.from(answerDivElement)
    // The DOM elements are looped through to include new answers.
    ultimateArr.forEach((answer, index) => {
        let answerDivElement = document.querySelector(`.answer-${index}`)
        if (answerDivElement.hasChildNodes() === true){
            answerDivElement.removeChild(answerDivElement.firstChild)
        }
        let answerElement = document.createElement("span")
        answerElement.innerText = `${letterArr[index]}) ${answer}`
        answerElement.setAttribute("id", `${index}`)
        answerDivElement.appendChild(answerElement)
    })
};


// clearChoices() -> clears the user answer choice selections
function clearChoices(){
    for (let i=0; i<4;i++){
        let answerAreas= document.querySelector(`.answer-${i}`)
            answerAreas.style.color = ""
    }
}

// displayChoiceFeedback() // highlights the selected answer
function displayChoiceFeedback(){
    if (gameStatus[2] === null){
        return
    }
    clearChoices()
    let userSelection = gameStatus[2]
    let userSelectEl = document.getElementById(`${userSelection}`)
    userSelectEl.style = ("color:yellow;")
}

// clears the user's feedback
function clearAnswer(){
    let resultBox = document.getElementById("#resultBox")
    console.log(resultBox)
    if (resultBox.hasChildNodes() === true){
        resultBox.removeChild(titleElement.firstChild)
    }
}

// displays the answer on the screen to give user feedback
function renderAnswer(){
    // The correct answer is displayed in the resultBox div
    let letterArr = ['a', 'b', 'c', 'd']
    let resultBox = document.getElementById("resultBox")
    let correctAnswer = document.createElement('span')
    correctAnswer.innerText = `The correct answer is: (${letterArr[gameStatus[1]]}) ${quizQuestionsShuffled[gameStatus[0]][1][0]}`
    resultBox.appendChild(correctAnswer)
}

// displays the score on the current screen
function renderScore(){
    // The current score id displayed in the score div
    let scoreBox = document.getElementById("score")
    let currentStatus = document.createElement('p')
    currentStatus.innerText = `Question: ${gameStatus[0]} / ${gameStatus[4]}\nScore: ${calculatePercentageWin()} `
    scoreBox.appendChild(currentStatus)
};


    
// renderBoard() -> takes the global variables, 'gameStatus' and 'quizQuestionShuffled' to render the gameboard
function renderQuestion(){
    if (gameStatus[5] < 0){
        loadNewQuestionsAndAnswers()
    }   
};

function renderBoard(){

}


function render(){ 

    renderQuestion();
    renderBoard();
}


function init(){
    // 'gameStatus' -> [question number / correct answer / user choice / questions correct / total question / Q or A page].
    gameStatus = [0,0,null,0,0,-1]
    quizQuestionsShuffled = [];  
    questionSet = QUESTIONS_RANDOM
    initializeGame();
    //resetBoard()
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


// // loadQuestion() -> loads the new question into the 'gameStatus' global variable.    
// function loadQuestion(){
//     // For initialization of the game, the first question is assigned an index of 0 in the global variable quizQuestionShuffled. 
//     // In order not to reassign the first question, if gameStatus[0] = 0, skip this step .
//     // gameStatus[0] contains information about which question is being asked from the global array, 'quizQuestionShuffled'
//     // the following if statement updates 'gameStatus' at index = 0 to the question number. 
//     gameStatus.splice(0, 1, questionNumber)
// };
