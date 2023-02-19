const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// set up the game window
const WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 500;
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;

// set up the font
const font = "30px Arial";

// set up the colors
const WHITE = "#FFFFFF";
const BLACK = "#000000";
const RED = "#FF0000";

// set up the player
const player_width = 50;
const player_height = 50;
let player_x = (WINDOW_WIDTH - player_width) / 2;
let player_y = WINDOW_HEIGHT - player_height;
const player_speed = 5;

// set up the ball
const ball_width = 25;
const ball_height = 25;
let ball_x = Math.floor(Math.random() * (WINDOW_WIDTH - ball_width));
let ball_y = 0;
const ball_speed = 3;

// set up the game variables
let score = 0;
let timed_mode = null;
let time_remaining = null;

// get user input for timed mode or not
while (true) {
    const mode_input = prompt("Do you want to play with a timer? (y/n): ");
    if (mode_input.toLowerCase() === "y") {
        timed_mode = true;
        time_remaining = 30;
        break;
    } else if (mode_input.toLowerCase() === "n") {
        timed_mode = false;
        break;
    } else {
        alert("Invalid input, please enter y or n.");
    }
}

// main game loop
let running = true;
const gameLoop = () => {
    // handle player movement
    if (keys[37] && player_x > 0) {
        player_x -= player_speed;
    } else if (keys[39] && player_x < WINDOW_WIDTH - player_width) {
        player_x += player_speed;
    }

    // update the ball position
    ball_y += ball_speed;
    if (ball_y > WINDOW_HEIGHT) {
        ball_x = Math.floor(Math.random() * (WINDOW_WIDTH - ball_width));
        ball_y = 0;
        score -= 1;
    }

    // check for collision with player
    if (player_x < ball_x + ball_width && player_x + player_width > ball_x &&
        player_y < ball_y + ball_height && player_y + player_height > ball_y) {
        ball_x = Math.floor(Math.random() * (WINDOW_WIDTH - ball_width));
        ball_y = 0;
        score += 1;
    }

    // clear the screen
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    // draw the player and the ball
ctx.fillStyle = BLACK;
ctx.fillRect(player_x, player_y, player_width, player_height);
ctx.fillStyle = RED;
ctx.beginPath();
ctx.arc(ball_x + ball_width/2, ball_y + ball_height/2, ball_width/2, 0, Math.PI * 2);
ctx.fill();

// draw the score and time remaining
score_text = "Score: " + score;
ctx.font = "30px sans-serif";
ctx.fillStyle = BLACK;
ctx.fillText(score_text, 10, 30);

if (timed_mode) {
time_text = "Time: " + time_remaining.toFixed(1);
ctx.fillText(time_text, canvas.width - 100, 30);
}

// decrement the time remaining if in timed mode
if (timed_mode) {
time_remaining -= clock.getDelta() / 1000;
if (time_remaining <= 0) {
running = false;
}
}

// set the frame rate
requestAnimationFrame(gameLoop);
clock.start();
}

// game over screen
ctx.fillStyle = WHITE;
ctx.fillRect(0, 0, canvas.width, canvas.height);

game_over_text = "Game Over";
score_text = "Final Score: " + score;

ctx.font = "50px sans-serif";
ctx.fillStyle = BLACK;
ctx.textAlign = "center";
ctx.fillText(game_over_text, canvas.width/2, canvas.height/2 - 50);
ctx.fillText(score_text, canvas.width/2, canvas.height/2 + 50);

// wait for the player to quit
canvas.addEventListener("click", function(event) {
window.location.reload();
});