import createMatrix from './layout/createMatrix';
import { placeMines } from './layout/placeMines';
import { createElement } from './layout/createElement';
import { setLocalStorage } from './layout/setLocalStorage';
import { createSpeaker } from './layout/createSpeaker';
import { createNumberMinesInput } from './layout/createNumberMinesInput';
import { field } from './gameProcess';

export let selectEl;
export let selectMinesEl;

export function createHTML(parameter) {
  setLocalStorage();
  createMatrix();
  placeMines();

  const isBlackTheme = localStorage.getItem('theme') === 'black';
  const isSpeakerOn = localStorage.getItem('speaker') === 'on';
  const isResumeGame = localStorage.getItem('resumeGame') === 'true';
  const level = +localStorage.getItem('level');
  const time = localStorage.getItem('time');
  const numberOfClick = localStorage.getItem('click');

  const heading = createElement('h1', 'title', 'Welcome to Minesweeper!');
  const nav = createElement('div', 'nav');
  const newGameBtn = createElement('button', 'new-game', 'New game');
  const speaker = createSpeaker(isBlackTheme, isSpeakerOn);
  const theme = createElement('div', 'theme themeWhite');
  const resultsBtn = createElement('button', 'resultsBtn', 'Results');
  const levelAndMines = createElement('div', 'level');
  const levelContainer = createElement('div', 'levelContainer');
  const levelTitle = createElement('div', 'levelTitle', 'Level:');
  const select = createElement('select', undefined, undefined, { id: 'options' });
  const option1 = createElement('option', undefined, 'easy', { value: 'easy' });
  const option2 = createElement('option', undefined, 'medium', { value: 'medium' });
  const option3 = createElement('option', undefined, 'hard', { value: 'hard' });
  const minesContainer = createElement('div', 'minesContainer');
  const howMatchMines = createElement('div', 'howMatchMines', 'Mines:');
  const selectMines = createNumberMinesInput();
  const info = createElement('div', 'nav');
  const timer = createElement('div', 'timer', `Time: ${time} seconds`);
  const countNumb = createElement('div', 'countNumb', `Number of click: ${numberOfClick}`);
  const gameFieldContainer = createElement('div', 'gameFieldContainer');
  const gameField = createElement('div', 'game-field');
  const bombSound = createElement('audio', undefined, undefined, { id: 'bombSound', src: 'assets/sound/lose.wav' });
  const flagSound = createElement('audio', undefined, undefined, { id: 'flagSound', src: 'assets/sound/click.wav' });
  const clickSound = createElement('audio', undefined, undefined, { id: 'clickSound', src: 'assets/sound/tick.mp3' });
  const winSound = createElement('audio', undefined, undefined, { id: 'winSound', src: 'assets/sound/win.mp3' });

  if (time === 'undefined' || numberOfClick === 'undefined') {
    localStorage.setItem('time', '0');
    localStorage.setItem('click', '0');
  }

  if (isBlackTheme) {
    document.body.classList.add('bodyBlack');
    heading.classList.add('white');
    theme.classList.add('themeBlack');
    levelTitle.classList.add('white');
    howMatchMines.classList.add('white');
    timer.classList.add('white');
    countNumb.classList.add('white');
    gameField.classList.add('gameFieldBlack');
  }

  switch (level) {
    case 10: option1.setAttribute('selected', '');
      break;
    case 15: option2.setAttribute('selected', '');
      break;
    case 25: option3.setAttribute('selected', '');
  }

  nav.append(newGameBtn, speaker, theme, resultsBtn);
  document.body.append(heading, nav, levelAndMines, info, gameFieldContainer, bombSound, flagSound, clickSound, winSound);
  levelAndMines.append(levelContainer, minesContainer);
  levelContainer.append(levelTitle, select);
  select.append(option1, option2, option3);
  minesContainer.append(howMatchMines, selectMines);
  info.append(timer, countNumb);
  gameFieldContainer.append(gameField);

  selectEl = document.getElementById('options');
  selectMinesEl = document.getElementById('selectMines');
  localStorage.setItem('howMatchMines', selectMinesEl.valueAsNumber);

  for (let i = 0; i < level; i += 1) {
    const row = createElement('div', 'row');
    gameField.append(row);
    for (let j = 0; j < level; j += 1) {
      const cell = document.createElement('div');
      if (parameter !== 'new game' && isResumeGame) {
        cell.className = localStorage.getItem(`class of ${i}Y${j}`);
        cell.innerText = localStorage.getItem(`inner of ${i}Y${j}`);
      } else cell.classList.add('cell');

      if (isBlackTheme) {
        cell.classList.add('cellBlack');
      }
      cell.setAttribute('id', `${i}Y${j}`);
      row.append(cell);
    }
  }

  for (let i = 0; i < level; i += 1) {
    for (let j = 0; j < level; j += 1) {
      const cell = document.getElementById(`${i}Y${j}`);
      if (!isResumeGame && field[i][j].hasMine === true) {
        cell.classList.add('mine');
      }
    }
  }
}
