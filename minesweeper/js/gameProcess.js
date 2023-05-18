import createHTML from "./createHTML";
import { placeMines } from "./placeMines.js";
import { field } from "./placeMines.js";
import { rows } from './placeMines';
import { cols } from './placeMines';
import { createMatrix } from "./placeMines.js";

let isFirstMove = true;
let cells = document.querySelectorAll('.cell');
let newGameBtn = document.querySelector('.new-game');
let numberOfOpenedCells;
let startTime;
let endTime;
let timerId;
let numberOfClick = document.querySelector('.countNumb');
let click = 0;
const bombSound = document.getElementById('bombSound');
const flagSound = document.getElementById('flagSound');
const clickSound = document.getElementById('clickSound');
const winSound = document.getElementById('winSound');
let speaker = document.querySelector('.speaker');
let resultsBtn = document.querySelector('.resultsBtn');
let themeBtn = document.querySelector('.theme');
let title = document.querySelector('.title');
let timer = document.querySelector('.timer');
let countNumb = document.querySelector('.countNumb');
let gameField = document.querySelector('.game-field');
let currentTime;
let lastTime = localStorage.getItem('time');
let resultTime;
let resultClick;


let resultsArr = [];
if (JSON.parse(localStorage.getItem('results'))) {
  resultsArr = JSON.parse(localStorage.getItem('results'));
}

function countMinesAround(event) {
  const currentCellId = event.target.getAttribute('id');
  const leftCell = document.getElementById(`X${currentCellId[1] - 1}Y${currentCellId[3]}`);
  const leftTopCell = document.getElementById(`X${currentCellId[1] - 1}Y${currentCellId[3] - 1}`);
  const topCell = document.getElementById(`X${currentCellId[1]}Y${currentCellId[3] - 1}`);
  const topRightCell = document.getElementById(`X${+currentCellId[1] + 1}Y${currentCellId[3] - 1}`);
  const rightCell = document.getElementById(`X${+currentCellId[1] + 1}Y${currentCellId[3]}`);
  const rightBottomCell = document.getElementById(`X${+currentCellId[1] + 1}Y${+currentCellId[3] + 1}`);
  const bottomCell = document.getElementById(`X${currentCellId[1]}Y${+currentCellId[3] + 1}`);
  const bottomLeftCell = document.getElementById(`X${currentCellId[1] - 1}Y${+currentCellId[3] + 1}`);
  const aroundCells = [leftCell, leftTopCell, topCell, topRightCell, rightCell, rightBottomCell,
    bottomCell, bottomLeftCell];
  field[currentCellId[1]][currentCellId[3]].opened = true;
  let numberOfMinesAround = 0;

  aroundCells.forEach((item) => {
    if (item && item.classList.contains('mine')) numberOfMinesAround += 1;
  });

  if (numberOfMinesAround === 0) {
    event.target.classList.add('invisible');
    event.target.classList.remove('bomb-here');
    aroundCells.forEach((neighbourCell) => {
      let neighbourId;
      if (neighbourCell) {
        neighbourId = neighbourCell.getAttribute('id');
      }
      if (neighbourId && !neighbourCell.classList.contains('mine') && field[neighbourId[1]][neighbourId[3]].checked === false) {
        field[neighbourId[1]][neighbourId[3]].checked = true;
        countMinesAround({ target: neighbourCell });
      }
    });
  }

  if (numberOfMinesAround !== 0) {
    event.target.classList.remove('bomb-here');
    event.target.innerText = numberOfMinesAround;
    switch (numberOfMinesAround) {
      case 1: event.target.classList.add('white');
        break;
      case 2: event.target.classList.add('blue');
        break;
      case 3: event.target.classList.add('yellow');
        break;
      case 4: event.target.classList.add('orange');
        break;
      case 5: event.target.classList.add('green');
        break;
      case 6: event.target.classList.add('violet');
        break;
      case 7: event.target.classList.add('brown');
        break;
      default: event.target.classList.add('pink');
    }
  }
  numberOfOpenedCells = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (field[i][j].opened) {
        numberOfOpenedCells++;
      }
    }
  }
  if (numberOfOpenedCells === 90) gameOver('win');
}


function startNewGame() {
  localStorage.setItem('time', '0');
  lastTime = 0;
  resultTime = 0;
  localStorage.setItem('click', '0');
  resultClick = 0;
  createMatrix();
  placeMines(10);
  document.body.innerHTML = '';
  createHTML.createHTML('new game');
  isFirstMove = true;
  cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', showCell);
    cell.addEventListener('contextmenu', markBomb);
  });
  newGameBtn = document.querySelector('.new-game');
  newGameBtn.addEventListener('click', startNewGame);
  clearTimeout(timerId);
  click = 0;
  speaker = document.querySelector('.speaker');
  speaker.addEventListener('click', () => playSound('soundToggle'));
  resultsBtn = document.querySelector('.resultsBtn');
  resultsBtn.addEventListener('click', showResults);
  themeBtn = document.querySelector('.theme');
  themeBtn.addEventListener('click', changeTheme);
  title = document.querySelector('.title');
  timer = document.querySelector('.timer');
  countNumb = document.querySelector('.countNumb');
  gameField = document.querySelector('.game-field');
}

function gameOver(result) {
  endTime = new Date();
  const timer = Math.floor((endTime - startTime) / 1000);
  const wrapper = document.createElement('div');
  const resultString = document.createElement('div');
  const newGameBtn2 = document.createElement('button');
  wrapper.classList.add('wrapper');
  resultString.classList.add('game-over');
  if (result === 'lose') {
    resultString.innerText = 'Game over. Try again';
  } else {
    resultString.innerText = `Hooray! You found all mines in ${timer} seconds and ${numberOfOpenedCells} moves!`;
    playSound('win');
    resultsArr.push(`Time: ${timer}, Moves: ${numberOfOpenedCells}`);
    localStorage.setItem('results', JSON.stringify(resultsArr));
  }
  newGameBtn2.classList.add('new-game');
  newGameBtn2.innerText = 'New game';
  document.body.appendChild(wrapper);
  wrapper.appendChild(resultString);
  wrapper.appendChild(newGameBtn2);
  clearTimeout(timerId);
  localStorage.setItem('time', '0');
  newGameBtn2.addEventListener('click', startNewGame);
}

function showCurrentGameTime() {
  currentTime = Math.floor((new Date() - startTime) / 1000);
  if (!isNaN(+lastTime)) {
    resultTime = +lastTime + +currentTime;
  } else resultTime = currentTime;

  timer = document.querySelector('.timer');
  timer.innerText = `Time: ${resultTime} seconds`;
  timerId = setTimeout(showCurrentGameTime, 1000);
}

function showCell(event) {
  numberOfClick = document.querySelector('.countNumb');
  if (!event.target.classList.contains('invisible')) {
    click++;
    playSound('click');
  }
  resultClick = click + +localStorage.getItem('click');
  numberOfClick.innerText = `Number of click: ${resultClick}`;
  if (isFirstMove) {
    startTime = new Date();
    showCurrentGameTime();
  }
  if (event.target.classList.contains('bomb-here')) return;
  if (event.target.classList.contains('mine') && isFirstMove === true) {
    placeMines(10);
    showCell(event);
  } else if (event.target.classList.contains('mine') && isFirstMove === false) {
    event.target.classList.add('bomb');
    playSound('lose');
    gameOver('lose');
  } else countMinesAround(event);
  isFirstMove = false;
}

function playSound(type) {
  if (type === 'soundToggle' && (!speaker.classList.contains('speakerOff') || !speaker.classList.contains('speakerOffWhite'))) localStorage.setItem('speaker', 'off');
  if (type === 'soundToggle' && (speaker.classList.contains('speakerOff') || speaker.classList.contains('speakerOffWhite'))) localStorage.setItem('speaker', 'on');
  if (type === 'soundToggle' && themeBtn.classList.contains('themeBlack')) {
    speaker.classList.toggle('speakerOffWhite');
    speaker.classList.toggle('speakerOnWhite');
  }
  if (type === 'soundToggle' && !themeBtn.classList.contains('themeBlack')) {
    speaker.classList.remove('speakerOffWhite');
    speaker.classList.toggle('speakerOff');
    speaker.classList.toggle('speakerOn');
  }

  if (type === 'lose' && localStorage.getItem('speaker') === 'on') bombSound.play();
  if (type === 'flag' && localStorage.getItem('speaker') === 'on') flagSound.play();
  if (type === 'click' && localStorage.getItem('speaker') === 'on') clickSound.play();
  if (type === 'win' && localStorage.getItem('speaker') === 'on') winSound.play();
}

function markBomb(event) {
  event.preventDefault();
  if (!(event.target.classList.contains('invisible')) && event.target.innerText === '') {
    event.target.classList.toggle('bomb-here');
    playSound('flag');
  }
}

function showResults() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  wrapper.classList.add('wrapper2');
  document.body.appendChild(wrapper);

  const closeBtn = document.createElement('div');
  closeBtn.classList.add('closeBtn');
  wrapper.appendChild(closeBtn);

  const slashBtn = document.createElement('div');
  slashBtn.classList.add('slashBtn');
  const slashBtn2 = document.createElement('div');
  slashBtn2.classList.add('slashBtn2');
  closeBtn.appendChild(slashBtn);
  closeBtn.appendChild(slashBtn2);

  const resultsTitle = document.createElement('h2');
  resultsTitle.classList.add('resultsTitle');
  resultsTitle.innerText = 'Your last 10 results:';
  wrapper.appendChild(resultsTitle);

  if (resultsArr && resultsArr.length > 0) {
    for (let i = 0; i <= resultsArr.length - 1; i++) {
      const result = document.createElement('div');
      result.classList.add('result');
      result.innerText = resultsArr[i];
      wrapper.appendChild(result);
    }
  }

  closeBtn.addEventListener('click', () => document.body.removeChild(wrapper));
}

function changeTheme(event) {
  document.body.classList.toggle('bodyBlack');
  if (localStorage.getItem('theme') === 'white') {
    localStorage.setItem('theme', 'black');
  } else if (localStorage.getItem('theme') === 'black') {
    localStorage.setItem('theme', 'white');
  }
  title.classList.toggle('white');
  timer.classList.toggle('white');
  countNumb.classList.toggle('white');
  cells.forEach((cell) => {
    cell.classList.toggle('cellBlack');
  });
  gameField.classList.toggle('gameFieldBlack');

  if (localStorage.getItem('speaker') === 'on' && event.target.classList.contains('themeBlack')) {
    speaker.className = 'speaker';
    speaker.classList.add('speakerOn');
  } else if (localStorage.getItem('speaker') === 'off' && !event.target.classList.contains('themeBlack')) {
    speaker.className = 'speaker';
    speaker.classList.add('speakerOffWhite');
  } else if (localStorage.getItem('speaker') === 'on' && !event.target.classList.contains('themeBlack')) {
    speaker.className = 'speaker';
    speaker.classList.add('speakerOnWhite');
  } else if (localStorage.getItem('speaker') === 'off' && event.target.classList.contains('themeBlack')) {
    speaker.className = 'speaker';
    speaker.classList.add('speakerOff');
  }

  themeBtn.classList.toggle('themeBlack');
}

cells.forEach((cell) => {
  cell.addEventListener('click', showCell);
  cell.addEventListener('contextmenu', markBomb);
});

newGameBtn.addEventListener('click', startNewGame);
speaker.addEventListener('click', () => playSound('soundToggle'));
resultsBtn.addEventListener('click', showResults);

if (localStorage.getItem('theme') === null) localStorage.setItem('theme', 'white');
themeBtn.addEventListener('click', changeTheme);

function saveGame() {
  for (let i = 0; i < 100; i++) {
    const currentClassesKey = 'class of ' + cells[i].getAttribute('id');
    const currentClasses = cells[i].className;
    const currentInner = cells[i].innerText;
    const currentInnerKey = 'inner of ' + cells[i].getAttribute('id');
    localStorage.setItem(currentClassesKey, currentClasses);
    localStorage.setItem(currentInnerKey, currentInner);
  }
  localStorage.setItem('time', resultTime);
  localStorage.setItem('click', resultClick);
}

window.addEventListener('beforeunload', saveGame);



