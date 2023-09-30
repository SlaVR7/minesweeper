import {
  cells,
  click,
  countNumb, gameField, levelTitle, minesTitle,
  newGameBtn,
  resultsBtn,
  speaker,
  themeBtn,
  timer,
  timerId,
  title
} from "../gameProcess";
import {showCell} from "./showCell";
import {markBomb} from "./markBomb";
import {playSound} from "./playSound";
import {showResults} from "./showResults";
import {changeTheme} from "./changeTheme";
import {startNewGame} from "./startNewGame";
import createMatrix from "../layout/createMatrix";
import {clearMines} from "../layout/clearMines";
import {placeMines} from "../layout/placeMines";
import {createHTML, selectEl} from "../createHTML";
import {changeLevel} from "./changeLevel";

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
  levelTitle = document.querySelector('.levelTitle');
  minesTitle = document.querySelector('.howMatchMines');
}
