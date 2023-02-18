// Select the game board and player elements
const gameBoard = document.querySelector('.game-board');
const player = document.getElementById('player');

// Define the number of balls to add and the game time in seconds
const numBalls = 20;
const gameTime = 60;

// Initialize the score and time variables
let score = 0;
let time = gameTime;

// Select the score and time elements
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');

// Update the time every second
const timer = setInterval(() => {
  time--;
  timeElement.textContent = time;

  // End the game when the time is up
  if (time === 0) {
    clearInterval(timer);
    endGame();
  }
}, 1000);

// Loop through the number of balls and create a ball element for each one
for (let i = 0; i < numBalls; i++) {
  // Create a new ball element
  const ball = document.createElement('div');
  ball.classList.add('ball');

  // Set a random position for the ball element
  const x = Math.floor(Math.random() * (gameBoard.offsetWidth - ball.offsetWidth));
  const y = Math.floor(Math.random() * (-400));
  ball.style.top = `${y}px`;
  ball.style.left = `${x}px`;

  // Add the ball element to the game board
  gameBoard.appendChild(ball);

  // Set a random speed for the ball element
  const speed = Math.random() * 4 + 1;

  // Update the position of the ball element every frame
  const update = setInterval(() => {
    // Calculate the new position of the ball element
    const newY = ball.offsetTop + speed;
    ball.style.top = `${newY}px`;

    // End the game if the ball reaches the bottom of the game board
    if (newY > gameBoard.offsetHeight) {
      clearInterval(update);
      gameBoard.removeChild(ball);
      endGame();
    }
    
    // Check for collision between the ball and player objects
    const playerRect = player.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    if (ballRect.bottom >= playerRect.top && 
        ballRect.right >= playerRect.left && 
        ballRect.left <= playerRect.right) {
      // Add the "caught" class to the ball element
      ball.classList.add('caught');

      // Increment the score by 1
      score++;
      scoreElement.textContent = score;
    }
  }, 10);
}

// Add event listeners to the player object
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      // Move the player to the left
      const currentLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
      player.style.left = `${currentLeft - 10}px`;
      player.classList.add('moving');
    } else if (event.key === 'ArrowRight') {
      // Move the player to the right
      const currentLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
      player.style.left = `${currentLeft + 10}px`;
      player.classList.add('moving');
    }
  });
  
  document.addEventListener('keyup', (event) => {
    // Stop the player from moving when the arrow key is released
    player.classList.remove('moving');
  });
  
  // End the game and display the score
  function endGame() {
    // Disable the player object
    player.style.pointerEvents = 'none';
  
    // Remove all the ball elements from the game board
    const balls = document.querySelectorAll('.ball');
    balls.forEach(ball => gameBoard.removeChild(ball));
  
    // Display the final score
    alert(`Game over! Your score is ${score}`);
  }
  
