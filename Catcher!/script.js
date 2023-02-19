var catcher = document.getElementById('catcher');
var arrows = document.getElementsByClassName('arrow');
var leftPos = 175;
var score = 0;

function moveLeft() {
	if (leftPos > 0) {
		leftPos -= 10;
		catcher.style.left = leftPos + 'px';
	}
}

function moveRight() {
	if (leftPos < 350) {
		leftPos += 10;
		catcher.style.left = leftPos + 'px';
	}
}

document.addEventListener('keydown', function(event) {
	if (event.code === 'ArrowLeft') {
		moveLeft();
	} else if (event.code === 'ArrowRight') {
		moveRight();
	}
});

function dropArrow() {
    var arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.style.left = Math.floor(Math.random() * 380) + 'px';
    var topPos = 0;
    var interval = setInterval(function() {
      topPos += 10;
      arrow.style.top = topPos + 'px';
      if (topPos > 350) {
        if (arrow.style.left === catcher.style.left) {
          score++;
          document.getElementById('score').innerHTML = 'Score: ' + score;
        }
        clearInterval(interval);
        arrow.parentNode.removeChild(arrow);
      }
    }, 50);
    document.getElementById('game-area').appendChild(arrow);
  }
  
  setInterval(dropArrow, 2000);
  
