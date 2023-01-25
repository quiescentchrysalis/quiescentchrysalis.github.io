let currentPlayer = 'X';
let gameWon = false;

const cells = document.querySelectorAll('td');
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(event) {
  if (event.target.textContent !== '' || gameWon) {
    return;
  }

  event.target.textContent = currentPlayer;

  checkWin();

  if (gameWon) {
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  winningCombos.forEach(combo => {
    if (cells[combo[0] - 1].textContent === currentPlayer &&
        cells[combo[1] - 1].textContent === currentPlayer &&
        cells[combo[2] - 1].textContent === currentPlayer) {
      gameWon = true;
      alert(`Player ${currentPlayer} wins!`);
    }
  });
}