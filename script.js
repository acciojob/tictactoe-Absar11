const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const startBtn = document.getElementById("submit");
let formContainer = document.getElementById("formContainer");
let gameContainer = document.getElementById("gameContainer");
let message = document.getElementById("message");
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameOver = false;
const cells = document.querySelectorAll("#grid div"); // Fix: Define 'cells' properly

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6] // Diagonals
];

gameContainer.style.display = "none";

// **Fix: Start game button**
startBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
    }

    formContainer.style.display = "none";
    gameContainer.style.display = "block";
    message.innerText = `${player1}, you're up`;
});

// **Fix: Check win function**
function checkWin() {
    for (let combo of winPatterns) {
        let [a, b, c] = combo; // Fix: Use array destructuring for simplicity

        if (cells[a].innerText !== "" &&
            cells[a].innerText === cells[b].innerText &&
            cells[a].innerText === cells[c].innerText) {
            
            // **Highlight winning cells**
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            let winner = currentPlayer === "X" ? player1 : player2;
            message.innerText = `${winner}, congratulations you won! 🎉`;

            gameOver = true;
            return true;
        }
    }
    return false;
}

// **Fix: Check draw condition**
function isDraw() {
    return [...cells].every(cell => cell.innerText !== "") && !gameOver;
}

// **Fix: Add event listener for each cell**
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.innerText === "" && !gameOver) {
            cell.innerText = currentPlayer;

            if (checkWin()) return;
            if (isDraw()) {
                message.innerText = "It's a draw!";
                gameOver = true;
                return;
            }

            // **Toggle turn**
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            let currentPlayerName = currentPlayer === "X" ? player1 : player2;
            message.innerText = `${currentPlayerName}, you're up`;
        }
    });
});
