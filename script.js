// Game variables
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let player1Score = 0;
let player2Score = 0;

// DOM elements
const cells = document.querySelectorAll('.cell');
const player1ScoreElem = document.getElementById('player1-score');
const player2ScoreElem = document.getElementById('player2-score');
const turnIndicator = document.getElementById('turn-indicator');
const restartBtn = document.getElementById('restart-btn');

// Winning combinations
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Sounds (optional)
const clickSound = new Audio('bell.mp3'); // Replace with actual file
const winSound = new Audio('bell2.mp3');   // Replace with actual file

// Reset the board to its initial state
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board array
    cells.forEach(cell => {
        cell.textContent = '';                   // Clear the visual grid
        cell.classList.remove('taken');          // Remove the "taken" class
    });
    currentPlayer = 'X';                         // Reset current player
    turnIndicator.textContent = `Player 1's Turn (X)`; // Reset the turn indicator
}

// Check for a win or draw
function checkWinner() {
    let winner = null;

    // Check winning combinations
    winningCombos.forEach(combo => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
        }
    });

    if (winner) {
        winSound.play(); // Play win sound
        if (winner === 'X') {
            player1Score++;
            player1ScoreElem.textContent = player1Score;
            alert('Player 1 Wins!');
        } else {
            player2Score++;
            player2ScoreElem.textContent = player2Score;
            alert('Player 2 Wins!');
        }
        resetBoard(); // Reset the board after a win
    } else if (!board.includes('')) {
        alert("It's a Draw!");
        resetBoard(); // Reset the board after a draw
    }
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (!board[index]) {
        clickSound.play(); // Play click sound
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken'); // Mark the cell as taken
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        turnIndicator.textContent = `Player ${currentPlayer === 'X' ? '1' : '2'}'s Turn (${currentPlayer})`;
        checkWinner();
    }
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add event listener to the restart button
restartBtn.addEventListener('click', resetBoard);

restartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to restart the game?')) {
        resetBoard();
    }
});
function resetBoard() {
    cells.forEach(cell => {
        cell.classList.add('fade-out');
        setTimeout(() => {
            cell.textContent = '';
            cell.classList.remove('taken', 'fade-out');
        }, 300);
    });
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    turnIndicator.textContent = `Player 1's Turn (X)`;
}

