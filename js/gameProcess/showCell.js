import { gameParameters, layout } from '../gameProcess';
import { playSound } from './playSound';
import { showCurrentGameTime } from './showCurrentGameTime';
import { startNewGame } from './startNewGame';
import { gameOver } from './gameOver';
import { countMinesAround } from './countMinesAround';

export function showCell(event) {
  const isFirstMove = localStorage.getItem('isFirstMove') === 'true';
  const cellClasses = event.target.classList;

  if (cellClasses.contains('invisible') || event.target.innerText !== '' || cellClasses.contains('bomb-here')) {
    return;
  }

  if (!cellClasses.contains('invisible')) {
    gameParameters.click += 1;
    playSound('click');
  }

  layout.numberOfClick = document.querySelector('.countNumb');
  gameParameters.resultClick = gameParameters.click + +localStorage.getItem('click');
  layout.numberOfClick.innerText = `Number of click: ${gameParameters.resultClick}`;

  if (isFirstMove || localStorage.getItem('resumeGame') === 'true') {
    gameParameters.startTime = new Date();
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
