import {click, resultClick, startTime, numberOfClick, startNewGame, gameOver, countMinesAround} from "../gameProcess";
import {playSound} from "./playSound";
import {showCurrentGameTime} from "./showCurrentGameTime";

export function showCell(event) {
  const isFirstMove = localStorage.getItem('isFirstMove') === 'true';
  const cellClasses = event.target.classList;

  if (cellClasses.contains('invisible') || event.target.innerText !== '' || cellClasses.contains('bomb-here')) {
    return;
  }

  if (!cellClasses.contains('invisible')) {
    click += 1;
    playSound('click');
  }

  numberOfClick = document.querySelector('.countNumb');
  resultClick = click + +localStorage.getItem('click');
  numberOfClick.innerText = `Number of click: ${resultClick}`;

  if (isFirstMove || localStorage.getItem('resumeGame') === 'true') {
    startTime = new Date();
    showCurrentGameTime();
  }
  if (cellClasses.contains('bomb-here')) {
    return;
  }
  if (cellClasses.contains('mine') && isFirstMove) {
    startNewGame();
    const currentCellId = event.target.getAttribute('id');
    const currentElement = document.getElementById(currentCellId);
    showCell({ target: currentElement });
  } else if (cellClasses.contains('mine') && !isFirstMove) {
    cellClasses.add('bomb');
    playSound('lose');
    gameOver('lose');
  } else countMinesAround(event);
  localStorage.setItem('isFirstMove', 'false');
  localStorage.setItem('resumeGame', 'false');
}
