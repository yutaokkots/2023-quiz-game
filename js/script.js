console.log("initiated")


const QUESTIONS_INDIA = {
}

const mainElement = document.querySelectorAll("main")

// -- variable declarations -- //
let userScore;



// render function -> clears board, displays answer, listens for mouseclick, checks answer, calculates, shows score
//displays answer
// listens for the mouseclick and reports back
// checks for the answer
// modifies/renders the board
//prints out the percentage win of the quiz game
// round the number
// prints it out on the bottom

// -- addEventListener() -- //

mainElement.addEventListener('click', (evt) => {

    let eventButton = evt.target.tagName = "button";

})



init();

//

// returns true or false
function checkAnswer(){

};

//calculates the percentage of wins for the game, also round the number
function calulatePercentage (){

};


function renderBoard(){};


function render(){

}



function init (){
    // score = [question correct, question number, score]
    userScore = [0, 0, 0];
    renderBoard();
    render();
};

