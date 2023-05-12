import createHTML from "./createHTML";
import { placeMines } from "./placeMines.js";

let isFirstMove = true;
let cells = document.querySelectorAll('.cell');

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
  let numberOfMinesAround = 0;
  aroundCells.forEach((item) => {
    if (item && item.classList.contains('mine')) numberOfMinesAround += 1;
  });
  if (numberOfMinesAround === 0) {
    event.target.classList.add('invisible');
  }
  if (numberOfMinesAround !== 0) {
    event.target.innerText = numberOfMinesAround;
  }
}

function showLose() {
  const wrapper = document.createElement('div');
  const gameOver = document.createElement('div');
  const newGame = document.createElement('button');
  wrapper.classList.add('wrapper');
  gameOver.classList.add('game-over');
  gameOver.innerText = 'Game over';
  newGame.classList.add('new-game');
  newGame.innerText = 'New game';
  document.body.appendChild(wrapper);
  wrapper.appendChild(gameOver);
  wrapper.appendChild(newGame);

  newGame.addEventListener('click', () => {
    document.body.innerHTML = '';
    createHTML.createHTML();
    isFirstMove = true;

    cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', showCell);
      cell.addEventListener('contextmenu', markBomb);
    });
  });
}



function showCell(event) {
  event.target.classList.remove('bomb-here');
  if (event.target.classList.contains('mine') && isFirstMove === true) {
    placeMines(10);
    countMinesAround(event);
  }
  if (event.target.classList.contains('mine') && isFirstMove === false) {
    event.target.classList.add('bomb');
    showLose();
  } else countMinesAround(event);
  isFirstMove = false;
}

function markBomb(event) {
  event.preventDefault();
  if (event.target.innerText === '') {
    event.target.classList.toggle('bomb-here');
  }
}

cells.forEach((cell) => {
  cell.addEventListener('click', showCell);
  cell.addEventListener('contextmenu', markBomb);
});