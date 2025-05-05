// перемикання вкладок
function showTab(id) {
  document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'captcha') generateCaptcha();
  if (id === 'tictactoe') initGame();
}

// змінні
let currentTab = null;
let captchaCode = '';
let currentPlayer = 'X';

// дані для капчі
const digits = {
  0: [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  1: [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
  2: [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  3: [[1,1,1],[0,0,1],[0,1,1],[0,0,1],[1,1,1]],
  4: [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  5: [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  6: [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  7: [[1,1,1],[0,0,1],[0,1,0],[0,1,0],[0,1,0]],
  8: [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  9: [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]]
};

// капча
function generateCaptcha() {
  const num = Math.floor(10 + Math.random() * 90);
  captchaCode = num.toString();
  const pixelCanvas = document.getElementById('pixelCanvas');
  pixelCanvas.innerHTML = '';
  const digitDivs = captchaCode.split('').map(d => createDigitDiv(digits[d]));
  digitDivs.sort(() => Math.random() - 0.5).forEach(div => pixelCanvas.appendChild(div));
}

function createDigitDiv(matrix) {
  const container = document.createElement('div');
  matrix.forEach(row => {
    row.forEach(cell => {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      if (cell === 0) pixel.style.visibility = 'hidden';
      container.appendChild(pixel);
    });
    container.appendChild(document.createElement('br'));
  });
  return container;
}

function checkCaptcha() {
  const input = document.getElementById('captchaInput').value;
  const result = document.getElementById('captchaResult');
  result.textContent = (input === captchaCode) ? 'Вірно!' : 'Невірно. Спробуйте ще.';
}

// хрестики-нолики
function initGame() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.addEventListener('click', () => makeMove(cell));
    board.appendChild(cell);
  }
  document.getElementById('gameStatus').textContent = '';
  currentPlayer = 'X';
}

function makeMove(cell) {
  if (cell.textContent) return;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    document.getElementById('gameStatus').textContent = `Гравець ${currentPlayer} переміг!`;
    Array.from(document.getElementById('board').children).forEach(c => c.onclick = null);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const cells = Array.from(document.getElementById('board').children).map(c => c.textContent);
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
}

function resetGame() {
  initGame();
}

// видалення div
function removeSecondGen() {
  const rootDivs = document.querySelectorAll('#divContainer > div');
  rootDivs.forEach(parent => {
    parent.querySelectorAll(':scope > div').forEach(child => child.remove());
  });
}

// ініціалізація капчі
showTab('captcha');