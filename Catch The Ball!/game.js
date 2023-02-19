// Define global variables
let gameArea, player, scoreDisplay, timeDisplay;
let score = 0;
let time = 60;

// Define function to spawn a new ball and make it fall down the game area
function spawnBall() {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  gameArea.appendChild(ball);

  let ballInterval = setInterval(function() {
    let ballTop = ball.offsetTop;
    ball.style.top = ballTop + 10 + "px";

    if (ballTop > player.offsetTop) {
      if (ball.offsetLeft > player.offsetLeft && ball.offsetLeft < player.offsetLeft + player.offsetWidth) {
        // ball caught by player
        score++;
        scoreDisplay.textContent = score;
      } else {
        // ball missed by player
      }
      clearInterval(ballInterval);
      gameArea.removeChild(ball);
      spawnBall();
    }
  }, 50);
}

// Define function to start the game and update the time left
function startGame() {
  gameArea = document.getElementById("game-area");
  player = document.getElementById("player");
  scoreDisplay = document.getElementById("score");
  timeDisplay = document.getElementById("time");

  let countdown = setInterval(function() {
    time--;
    timeDisplay.textContent = time;

    if (time === 0) {
      clearInterval(countdown);
      alert("Game over! Your score is " + score);
      location.reload();
    }
  }, 1000);

  spawnBall();

  // Add event listener to move the player left or right when the arrow keys are pressed
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
      player.style.left = player.offsetLeft - 10 + "px";
    } else if (event.key === "ArrowRight") {
      player.style.left = player.offsetLeft + 10 + "px";
    }
  });
}

// Call startGame function when the page is loaded
window.onload = function() {
  startGame();
};
