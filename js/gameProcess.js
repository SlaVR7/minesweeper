if (!localStorage.getItem('isFirstMove') || localStorage.getItem('isFirstMove') === 'undefined') {
  localStorage.setItem('isFirstMove', 'true');
}
export let cells = document.querySelectorAll('.cell');
export let newGameBtn = document.querySelector('.new-game');
export let numberOfOpenedCells;
export let startTime;
export let endTime;
export let timerId;
export let numberOfClick = document.querySelector('.countNumb');
export let click = 0;
export const bombSound = document.getElementById('bombSound');
export const flagSound = document.getElementById('flagSound');
export const clickSound = document.getElementById('clickSound');
export const winSound = document.getElementById('winSound');
export let speaker = document.querySelector('.speaker');
export let resultsBtn = document.querySelector('.resultsBtn');
export let themeBtn = document.querySelector('.theme');
export let title = document.querySelector('.title');
export let timer = document.querySelector('.timer');
export let countNumb = document.querySelector('.countNumb');
export let gameField = document.querySelector('.game-field');
export let levelTitle = document.querySelector('.levelTitle');
export let minesTitle = document.querySelector('.howMatchMines');
export let currentTime;
export let lastTime = localStorage.getItem('time');
export let resultTime;
export let resultClick;
export let resultsArr = [];

if (JSON.parse(localStorage.getItem('results'))) {
  resultsArr = JSON.parse(localStorage.getItem('results'));
}
if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'white');
}
