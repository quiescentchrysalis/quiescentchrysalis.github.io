// Set variables
const gameBoard = document.querySelector(".game-board");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
let score = 0;
let time = 60;

// Create a function to generate a random number between min and max
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Create a function to add balls to the game board
function addBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.top = random(0, 350) + "px";
  ball.style.left = random(0, 350) + "px";
  ball.addEventListener("click", () => {
    ball.remove();
    score++;
    scoreEl.innerText = score;
  });
  gameBoard.appendChild(ball);
}

// Create a function to start the game
function startGame() {
  setInterval(() => {
    if (time > 0) {
      addBall();
      time--;
      timeEl.innerText = time;
    } else {
      clearInterval();
      alert(`Game over! Your score is ${score}.`);
      location.reload();
    }
  }, 1000);
}

// Call the startGame function
startGame();
