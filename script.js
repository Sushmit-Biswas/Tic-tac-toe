const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.getElementById('restart');
const overlay = document.getElementById('overlay');
const winnerText = document.getElementById('winner-text');
const playAgainBtn = document.getElementById('play-again');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkForWinner();
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showWinner(`${currentPlayer} Wins!`);
        gameActive = false;
    } else if (!gameBoard.includes('')) {
        showWinner("It's a Draw!");
        gameActive = false;
    } else {
        switchPlayer();
    }
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    hideOverlay();
};

const showWinner = (message) => {
    winnerText.textContent = message;
    overlay.classList.remove('hidden');
};

const hideOverlay = () => {
    overlay.classList.add('hidden');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);
