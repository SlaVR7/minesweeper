import { createHTML } from './createHTML';
import { addEventListeners } from './gameProcess/addEventListeners';

export const field = [];

createHTML();

if (!localStorage.getItem('isFirstMove') || localStorage.getItem('isFirstMove') === 'undefined') {
  localStorage.setItem('isFirstMove', 'true');
}

export const layout = {
  newGameBtn: document.querySelector('.new-game'),
  cells: document.querySelectorAll('.cell'),
  numberOfClick: document.querySelector('.countNumb'),
  bombSound: document.getElementById('bombSound'),
  flagSound: document.getElementById('flagSound'),
  clickSound: document.getElementById('clickSound'),
  winSound: document.getElementById('winSound'),
  speaker: document.querySelector('.speaker'),
  resultsBtn: document.querySelector('.resultsBtn'),
  themeBtn: document.querySelector('.theme'),
  title: document.querySelector('.title'),
  timer: document.querySelector('.timer'),
  countNumb: document.querySelector('.countNumb'),
  gameField: document.querySelector('.game-field'),
  levelTitle: document.querySelector('.levelTitle'),
  minesTitle: document.querySelector('.howMatchMines'),
};

export const gameParameters = {
  numberOfOpenedCells: null,
  startTime: null,
  endTime: null,
  timerId: null,
  click: 0,
  currentTime: null,
  lastTime: localStorage.getItem('time'),
  resultTime: null,
  resultClick: null,
};

export let resultsArr = [];

if (JSON.parse(localStorage.getItem('results'))) {
  resultsArr = JSON.parse(localStorage.getItem('results'));
}
if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'white');
}

addEventListeners();
