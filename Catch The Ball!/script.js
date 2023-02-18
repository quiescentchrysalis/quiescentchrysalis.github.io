// Select the game board element
const gameBoard = document.querySelector('.game-board');

// Define the number of balls to add
const numBalls = 10;

// Loop through the number of balls and create a ball element for each one
for (let i = 0; i < numBalls; i++) {
  // Create a new ball element
  const ball = document.createElement('div');
  ball.classList.add('ball');

  // Set a random position for the ball element
  const x = Math.floor(Math.random() * (gameBoard.offsetWidth - ball.offsetWidth));
  const y = Math.floor(Math.random() * (gameBoard.offsetHeight - ball.offsetHeight));
  ball.style.top = `${y}px`;
  ball.style.left = `${x}px`;

  // Add a click event listener to the ball element
  ball.addEventListener('click', () => {
    // Add the "caught" class to the ball element
    ball.classList.add('caught');

    // Increment the score by 1
    score++;
    scoreElement.textContent = score;
  });

  // Add the ball element to the game board
  gameBoard.appendChild(ball);
}