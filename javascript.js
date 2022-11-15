const cells = document.querySelectorAll('.cell');
const newGame = document.getElementById('newgamebutton');
const stats = document.getElementById('statsbutton');
const gameVibes = document.getElementById('gamevibesbutton');
const endGameMessage = document.getElementById('winmessage');
const playerOne = 'Player One';
const playerTwo = 'Player Two';
let currentPlayer = playerOne;
const playerPhrase = document.getElementById('playerPhrase');
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let boardState = Array(cells.length).fill('');
var gameOver = false;

cells.forEach((cell) => cell.addEventListener('click', doThisOnClick));

function doThisOnClick(event) { 
    let clickedCell = event.target;
    if(clickedCell.innerHTML || gameOver) {
        return;
    }
    makeAMark(clickedCell);//add an X or O on click
    //debugger;
    checkForWin(clickedCell);//check to see if three in a row/col/diag
    checkForDraw();
    changePlayerUpPhrase();//change Player display if a cell is chosed by previous player
    endGame();//run end game message 
}

function makeAMark(cell) {
    if(currentPlayer === playerOne) {
        cell.innerHTML = 'X';
        currentPlayer = playerTwo;
    } else {
        cell.innerHTML = 'O';
        currentPlayer = playerOne;
        
    }

}
function changePlayerUpPhrase() {
    if(gameOver) {
        playerPhrase.innerHTML = "Heck'in NICE!";
        return;
    }

    let phrases = [`You're Up, ${currentPlayer}!`, `${currentPlayer} is Up!`, `Make a move ${currentPlayer}!`, `Let's go ${currentPlayer}!`, `What are you waiting for ${currentPlayer}?`];
    let randomNumber = Math.floor(Math.random() * 4);
    playerPhrase.innerHTML = phrases[randomNumber];
}

function checkForWin(clickedCell) {  
    const cellNumber = clickedCell.dataset.index;
    boardState[cellNumber] = clickedCell.innerHTML; 
    
    for(let winCombo of winCombos) {
        let oneInARow = boardState[winCombo[0]];
        let twoInARow = boardState[winCombo[1]];
        let threeInARow = boardState[winCombo[2]];
        
        if(oneInARow !== '' && oneInARow === twoInARow && oneInARow === threeInARow) {
            gameOver = true; 
            endGameMessage.innerHTML = `${oneInARow} wins!`; 
        }
         
    }
}

function checkForDraw() {
            // search boardState for empty strings 
    if(gameOver) {
        return;
    }       
    let thereAreEmptyCells = false;
    boardState.forEach((value) => {
        if(value === '') {
            thereAreEmptyCells = true;
        } 
    }
    );
            // if empty strings, return
    if(thereAreEmptyCells) {
        return;
    }
            // otherwise, set gameOver to true and display Draw in end game message
    gameOver = true;
    endGameMessage.innerHTML = "It's a Draw!";
}
    



newGame.addEventListener('click', resetGame);
function resetGame() {
    for(const cell of cells) {
        cell.innerHTML = '';
        boardState = Array(cells.length).fill('');
        currentPlayer = playerOne;
        changePlayerUpPhrase();
        gameOver = false; 
        endGameMessage.classList.add('hidden');
    }
}

function endGame() {
    if(gameOver) {
        endGameMessage.classList.remove('hidden');
    }
}

gameVibes.addEventListener('click', changeColors);
function changeColors() {
    if(document.getElementById('gamevibesbutton').className === 'select') {
        document.getElementById('newgamebutton').className = 'select_v2';
        document.getElementById('statsbutton').className = 'select_v2';
        document.getElementById('gamevibesbutton').className = 'select_v2';
    } else if(document.getElementById('gamevibesbutton').className === 'select_v2') {
        document.getElementById('newgamebutton').className = 'select';
        document.getElementById('statsbutton').className = 'select';
        document.getElementById('gamevibesbutton').className = 'select';
    }
}

stats.addEventListener('click', () => {
    console.log("This Button Doesn't Do Anything!");
});
