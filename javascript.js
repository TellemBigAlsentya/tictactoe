let boardInteger = 3;

// create input for player to select board size and assign it to bordIntger
const cellNumberInput = 
const titleElem = document.createElement('h1');
const gameBoardInstructions = document.createElement('h3');
gameBoardInstructions.textContent = `Instructuons: Weclome players, get ${boardInteger} marks in a row (up/down , side/side, or diagonally), to win!`;
gameBoardInstructions.classList.add('hidden');
document.body.appendChild(gameBoardInstructions);

const players = ['X', 'O'];
let currentPLayer = players[0];
let gameBoardElem;