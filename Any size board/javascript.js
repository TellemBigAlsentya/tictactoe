let boardSize = null;
let gameBoardInstructions = document.getElementById('board-instructions');
gameBoardInstructions.textContent = 'Instructions: Select a board size by submitting a number in the field below vvvv';
let boardState = []; 
const players = ['X', 'O'];
let currentPlayer = players[0];
const playerPhrase = document.getElementById('playerPhrase');
playerPhrase.innerHTML = `First up is ${currentPlayer}'s`;
playerPhrase.classList.add('hidden');
let gameOver = false;
let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);


// create input for player to select board size and assign it to bordIntger
const boardSizeForm = document.getElementById('board-size-selection');
const boardSizeSubmitButton = document.getElementById('board-size-submit-button');

boardSizeSubmitButton.addEventListener('click', (event) => {
    // preventDefault keeps the page form reloading 
    // normally HTML buttons with type=submit will cause a page refresh (that's the default behavior we're preventing)
    event.preventDefault();
    // The FormData class is a built in tool to help grab data from form elements. 
    const formData = new FormData(boardSizeForm);
    // The get method of formData looks for a _name_ HTML attribute that matches what you provide ('boardSize' in this case)
    boardSize = parseInt(formData.get('boardSizeSelector')); // --> spits out the board size integer and saves it in boardSize
    // use boardSize to generate the board --> call board function, pass in boardSize
    // change instructions, set form to hidden class
    gameBoardInstructions.textContent = `Instructions: Weclome players, get ${boardSize} marks in a row (up/down , side/side, or diagonally), to win!`;
    boardSizeForm.classList.add('hidden');
    playerPhrase.classList.remove('hidden'); 
    createBoard(boardSize);

});

function createBoard(cells) {
    //create html elements with cell class based on the form input 
    let gameBoardContainer = document.createElement('div');
    gameBoardContainer.classList.add('board-container');
    document.body.appendChild(gameBoardContainer);
    // create a grid of cells based on the passed in value for board size
    // ie. if cells = 3 then a 3 x 3 grid of cells
    // iterate over the passed in number to create an array of objects,
    // where each cell has a representative object
    for(let i = 0; i < cells; i++) {
        //create a each column of cells as a container
        let columnElem = document.createElement('div');
        columnElem.classList.add('column-element');
        gameBoardContainer.appendChild(columnElem);

        
        for(let j = 0; j < cells; j++) {
            //fill each column of cells
            let cellElem = document.createElement('div');
            cellElem.classList.add('cell');
            cellElem.dataset.index = `${(cells * i) + j}`;
            if(cells > 10) {
                cellElem.classList.add('cell-size-small');
            } else if(cells < 4) {
                cellElem.classList.add('cell-size-large');
            } else {
                cellElem.classList.add('cell-size-normal');

            }
            columnElem.appendChild(cellElem);
            let cellLocation = {
                'column':`${i}`,
                'row':`${j}`,
                'mark':'',
                'isLeftDiagonal': i === j,
                'isRightDiagonal': i + j + 1 === cells,
            };
            boardState.push(cellLocation);
            cellElem.addEventListener('click', doThisOnClick);
        }
    } 
}
// this function is called when any cell is clicked on 
// nested functions are to add a mark to selected cells 
// change the player phrase 
function doThisOnClick(event) { 
    let clickedCell = event.target;
    if(clickedCell.innerHTML || gameOver) {
        return;
    }
    makeAMark(clickedCell);
    changePlayerUpPhrase();
    endGame();
}

function checkForWin() {
    checkForRowWin();
    checkForColumnWin();
    checkForDiagonalWin();
    checkForDraw();
}
// add mark to cell on click + styling for X vs O marks + check for win before changing
// next player --> due to currentPlayer dependencies
function makeAMark(cell) {
    if(currentPlayer === players[0]) {
        cell.innerHTML = 'X';
        cell.classList.add('X');
        // add mark value of X or O to object array 
        boardState[cell.dataset.index].mark = 'X';
        checkForWin();
        if(gameOver) {
            return;
        }
        currentPlayer = players[1];
    } else {
        cell.innerHTML = 'O';
        cell.classList.add('O');
        boardState[cell.dataset.index].mark = 'O';
        checkForWin();
        if(gameOver) {
            return;}
        currentPlayer = players[0];
        
    }
}
//change the player phrase using a randomized selection 
function changePlayerUpPhrase() {
    if(gameOver) {
        return;
    }
    let phrases = [`You're Up, ${currentPlayer}!`, `${currentPlayer} is Up!`, `Make a move ${currentPlayer}!`, `Let's go ${currentPlayer}!`, `What are you waiting for ${currentPlayer}?`];
    let randomNumber = Math.floor(Math.random() * 4);
    playerPhrase.innerHTML = phrases[randomNumber];
}
//stuff that happens when someone wins/draw
function endGame() {
    if(gameOver) {
        console.log('game over');
        gameBoardInstructions.classList.add('hidden');
        resetButton.classList.remove('hidden');
        
    }
}


// check for win by checking the object array for row, column, diagonal win
// we know that if the key value pairs of mark and either row/column match, we have a win
// for diagonal we are checking to see if marks are equal and either diagonal cond=true
function checkForRowWin() {
    //make function that increments through boardstate and creates an array of objects
    //that have matching rows -> these are our row win condition check
    for(let i = 0; i < boardSize; i++) { 
        let matchingRows = boardState.filter(match => match.row === `${i}`);  
        // this spits out an array of objects that all have the same row value as the iterator
        //so for the first iteration, we can all the objects from boardstate, that have a row value of '0'
        let matchingRowAndMark = matchingRows.filter(matchedMark => matchedMark.mark === `${currentPlayer}`);
        // the filter method here moves through the array of objects created from matchingRows
        // and looks for all the objects that have a value of either X or O depending on currentPlayer         
        if(matchingRowAndMark.length === boardSize) {
            gameOver = true;
            playerPhrase.innerHTML = `${currentPlayer}'s Wins!`;
            break;
        
        }
    }
}
//same function architecture for column win condition 
function checkForColumnWin() {
    for(let i = 0; i < boardSize; i++) { 
        let matchingColumns = boardState.filter(match => match.column === `${i}`);  
        let matchingColumnAndMark = matchingColumns.filter(matchedMark => matchedMark.mark === `${currentPlayer}`);
        
        if(matchingColumnAndMark.length === boardSize) {
            gameOver = true;
            playerPhrase.innerHTML = `${currentPlayer}'s Wins!`;
            break;
        }  
    }
}

function checkForDiagonalWin() {
    // to check for a diagonal win, we want to find a group of objects that have the 
    // value of diagonal win = true as well as the mark value. To do that, we need to 
    // search through all the cells being made by the createBoard function and saved in boardState
    let rightDiagonalCells = boardState.filter(cell => cell.isRightDiagonal);
    let leftDiagonalCells = boardState.filter(cell => cell.isLeftDiagonal);
    let isRightDiagonalWin = rightDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
    let isLeftDiagonalWin = leftDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
    if(isRightDiagonalWin.length === boardSize || isLeftDiagonalWin.length === boardSize) {
        gameOver = true;
        playerPhrase.innerHTML = `${currentPlayer}'s Wins!`;
    }
}

function checkForDraw() {
    let noEmptyCells = boardState.filter(nonEmpty => nonEmpty.mark === '');
    console.log(noEmptyCells);
    if(noEmptyCells.length === 0 && gameOver === false) {
        gameOver = true; 
        playerPhrase.innerHTML = `It's a Draw!`;
        
    }
}

function resetGame() {
     // reset board state by allowing players to re-select board size
    boardSize = null; 
    currentPlayer = players[0];
    playerPhrase.innerHTML = `First up is ${currentPlayer}'s`;
    playerPhrase.classList.add('hidden');
    boardSizeForm.classList.remove('hidden');
    gameBoardInstructions.textContent = 'Instructions: Select a board size by submitting a number in the field below vvvv';
    gameBoardInstructions.classList.remove('hidden');
    resetButton.classList.add('hidden');
    let gameBoardContainer = document.querySelector('.board-container'); 
    gameBoardContainer.remove();
    boardState = [];
    gameOver = false;     
}

// if all the values are filled and there is no winner, draw. 
// set game over to true 
// run game over message
// program reset game button 
