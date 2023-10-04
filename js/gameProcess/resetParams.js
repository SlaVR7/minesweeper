import { gameParameters, layout } from '../gameProcess';
import { showCell } from './showCell';
import { markBomb } from './markBomb';
import { playSound } from './playSound';
import { showResults } from './showResults';
import { changeTheme } from './changeTheme';
import { startNewGame } from './startNewGame';
import createMatrix from '../layout/createMatrix';
import { clearMines } from '../layout/clearMines';
import { placeMines } from '../layout/placeMines';
import { createHTML, selectEl } from '../createHTML';
import { changeLevel } from './changeLevel';

export function resetParams() {
  createMatrix();
  clearMines();
  placeMines();
  localStorage.setItem('isFirstMove', 'true');
  localStorage.setItem('time', '0');
  localStorage.setItem('click', '0');
  document.body.innerHTML = '';
  createHTML('new game');
  selectEl.addEventListener('change', changeLevel);
  layout.cells = document.querySelectorAll('.cell');
  layout.cells.forEach((cell) => {
    cell.addEventListener('click', showCell);
    cell.addEventListener('contextmenu', markBomb);
  });
  layout.newGameBtn = document.querySelector('.new-game');
  layout.newGameBtn.addEventListener('click', startNewGame);
  clearTimeout(gameParameters.timerId);
  gameParameters.click = 0;
  layout.speaker = document.querySelector('.speaker');
  layout.speaker.addEventListener('click', () => playSound('soundToggle'));
  layout.resultsBtn = document.querySelector('.resultsBtn');
  layout.resultsBtn.addEventListener('click', showResults);
  layout.themeBtn = document.querySelector('.theme');
  layout.themeBtn.addEventListener('click', changeTheme);
  layout.title = document.querySelector('.title');
  layout.timer = document.querySelector('.timer');
  layout.countNumb = document.querySelector('.countNumb');
  layout.gameField = document.querySelector('.game-field');
  layout.levelTitle = document.querySelector('.levelTitle');
  layout.minesTitle = document.querySelector('.howMatchMines');
}
