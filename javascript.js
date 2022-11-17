let boardSize = 3;

// create input for player to select board size and assign it to bordIntger
const boardSizeForm = document.getElementById('board-size-selection');
const boardSizeSubmitButton = document.getElementById('board-size-subit-button');

boardSizeSubmitButton.addEventListener('click', (event) => {
    // preventDefault keeps the page form reloading 
    // normally HTML buttons with type=submit will cause a page refresh (that's the default behavior we're preventing)
    event.preventDefault();

    // The FormData class is a built in tool to help grab data from form elements. 
    const formData = new FormData(boardSizeForm);

    // The get method of formData looks for a _name_ HTML attribute that matches what you provide ('boardSize' in this case)
    boardSize = formData.get('boardSizeSelector');

    // Threw this in to show that it works.
    console.log(formData.get('boardSizeSelector'));
});

const titleElem = document.createElement('h1');
const gameBoardInstructions = document.createElement('h3');
gameBoardInstructions.textContent = `Instructuons: Weclome players, get ${boardSize} marks in a row (up/down , side/side, or diagonally), to win!`;
gameBoardInstructions.classList.add('hidden');
document.body.appendChild(gameBoardInstructions);

const players = ['X', 'O'];
let currentPLayer = players[0];
let gameBoardElem;

