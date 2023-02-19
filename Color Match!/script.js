var colors = [
	{name: 'Red', value: '#e74c3c'},
	{name: 'Green', value: '#2ecc71'},
	{name: 'Blue', value: '#3498db'},
	{name: 'Yellow', value: '#f1c40f'},
	{name: 'Purple', value: '#9b59b6'},
	{name: 'Orange', value: '#e67e22'},
	{name: 'Pink', value: '#e91e63'},
	{name: 'Black', value: '#000000'},
	{name: 'White', value: '#ffffff'}
];

var score = 0;

function startGame() {
	var colorIndex = Math.floor(Math.random() * colors.length);
	var color = colors[colorIndex].value;
	var colorName = colors[colorIndex].name;

	document.getElementById('color').textContent = colorName;
	document.getElementById('color').style.backgroundColor = color;

	var options = document.getElementById('options');
	options.innerHTML = '';

	var correctOptionIndex = Math.floor(Math.random() * 4);
	for (var i = 0; i < 4; i++) {
		var option = document.createElement('div');
		option.className = 'option';
		if (i === correctOptionIndex) {
			option.textContent = colorName;
			option.dataset.correct = 'true';
		} else {
			var randomIndex = Math.floor(Math.random() * colors.length);
			option.textContent = colors[randomIndex].name;
			option.dataset.correct = 'false';
		}
		option.style.backgroundColor = colors[randomIndex].value;
		option.addEventListener('click', checkAnswer);
		options.appendChild(option);
	}

	function checkAnswer(event) {
		var option = event.target;
		if (option.dataset.correct === 'true') {
			option.className += ' correct';
			score++;
			document.getElementById('score-value').textContent = score;
			setTimeout(startGame, 1000);
		} else {
			option.className += ' incorrect';
			score--;
			document.getElementById('score-value').textContent = score;
		}
		options.removeEventListener('click', checkAnswer);
	}
}

startGame();
