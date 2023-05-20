export let selectEl;
export let selectMinesEl;

if (!localStorage.getItem('howMatchMines')) localStorage.setItem('howMatchMines', '10');
if (!localStorage.getItem('resumeGame')) localStorage.setItem('resumeGame', 'false');
if (!localStorage.getItem('time')) localStorage.setItem('time', '0');
if (!localStorage.getItem('click')) localStorage.setItem('click', '0');

export const field = [];

if (!localStorage.getItem('level')) localStorage.setItem('level', '10');
// Create matrix
export function createMatrix() {
  if (localStorage.getItem('resumeGame') === 'true') return;
  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    field[i] = [];
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      field[i][j] = {
        hasMine: false,
        checked: false,
        opened: false,
        id: `${i}Y${j}`,
      }
    }
  }
}
createMatrix();

// Place mines
export function clearMines() {
  if (localStorage.getItem('resumeGame') === 'true') return;
  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      field[i][j].hasMine = false;
    }
  }
}

export function placeMines() {
  if (localStorage.getItem('resumeGame') === 'true') return;
  for (let minesPlaced = 0; minesPlaced < localStorage.getItem('howMatchMines');) {
    const row = Math.floor(Math.random() * +localStorage.getItem('level'));
    const col = Math.floor(Math.random() * +localStorage.getItem('level'));
    if (!field[row][col].hasMine) {
      field[row][col].hasMine = true;
      minesPlaced += 1;
    }
  }
}
placeMines();

export function createHTML(parameter) {

  if (localStorage.getItem('theme') === 'black') document.body.classList.add('bodyBlack');


  const heading = document.createElement('h1');
  heading.classList.add('title');
  if (localStorage.getItem('theme') === 'black') heading.classList.add('white');
  heading.innerText = 'Welcome to Minesweeper!';
  document.body.appendChild(heading);

  const nav = document.createElement('div');
  nav.classList.add('nav');
  document.body.appendChild(nav);

  const newGameBtn = document.createElement('button');
  newGameBtn.classList.add('new-game');
  newGameBtn.innerText = 'New game';
  nav.appendChild(newGameBtn);

  const speaker = document.createElement('div');
  speaker.classList.add('speaker');
  if ((localStorage.getItem('theme') === 'black') && (localStorage.getItem('speaker') === 'on')) {
    speaker.className = 'speaker speakerOnWhite';
  } else if ((localStorage.getItem('theme') === 'black') && (localStorage.getItem('speaker') === 'off')) {
    speaker.className = 'speaker speakerOffWhite';
  } else if ((localStorage.getItem('theme') === 'white') && (localStorage.getItem('speaker') === 'off')) {
    speaker.className = 'speaker speakerOff';
  } else if ((localStorage.getItem('theme') === 'white') && (localStorage.getItem('speaker') === 'on')) {
    speaker.className = 'speaker speakerOn';
  } else {
    speaker.className = 'speaker speakerOn';
    localStorage.setItem('speaker', 'on');
  }
  nav.appendChild(speaker);

  const theme = document.createElement('div');
  theme.classList.add('theme');
  theme.classList.add('themeWhite');
  if (localStorage.getItem('theme') === 'black') {
    theme.classList.add('themeBlack');
  }
  nav.appendChild(theme);

  const resultsBtn = document.createElement('button');
  resultsBtn.classList.add('resultsBtn');
  resultsBtn.innerText = 'Results';
  nav.appendChild(resultsBtn);

  const levelAndMines = document.createElement('div');
  levelAndMines.classList.add('level');
  document.body.appendChild(levelAndMines);

  const levelContainer = document.createElement('div');
  levelContainer.classList.add('levelContainer');
  levelAndMines.appendChild(levelContainer);

  const levelTitle = document.createElement('div');
  levelTitle.classList.add('levelTitle');
  if (localStorage.getItem('theme') === 'black') {
    levelTitle.classList.add('white');
  }
  levelTitle.innerText = 'Level:';
  levelContainer.appendChild(levelTitle);

  const select = document.createElement('select');
  select.setAttribute('id', 'options');
  levelContainer.appendChild(select);
  selectEl = document.getElementById('options');

  const option1 = document.createElement('option');
  option1.setAttribute('value', 'easy');
  option1.innerText = 'easy';
  if (localStorage.getItem('level') === '10') option1.setAttribute('selected', '');
  select.appendChild(option1);

  const option2 = document.createElement('option');
  option2.setAttribute('value', 'medium');
  option2.innerText = 'medium';
  if (localStorage.getItem('level') === '15') option2.setAttribute('selected', '');
  select.appendChild(option2);

  const option3 = document.createElement('option');
  option3.setAttribute('value', 'hard');
  option3.innerText = 'hard';
  if (localStorage.getItem('level') === '25') option3.setAttribute('selected', '');
  select.appendChild(option3);

  const minesContainer = document.createElement('div');
  minesContainer.classList.add('minesContainer');
  levelAndMines.appendChild(minesContainer);

  const howMatchMines = document.createElement('div');
  howMatchMines.classList.add('howMatchMines');
  if (localStorage.getItem('theme') === 'black') {
    howMatchMines.classList.add('white');
  }
  howMatchMines.innerText = 'Mines:';
  minesContainer.appendChild(howMatchMines);

  const selectMines = document.createElement('input');
  selectMines.setAttribute('id', 'selectMines');
  selectMines.setAttribute('type', 'number');
  selectMines.setAttribute('min', '10');
  selectMines.setAttribute('max', '99');
  selectMines.setAttribute('value', localStorage.getItem('howMatchMines'));
  minesContainer.appendChild(selectMines);
  selectMinesEl = document.getElementById('selectMines');
  localStorage.setItem('howMatchMines', selectMinesEl.valueAsNumber);

  const info = document.createElement('div');
  info.classList.add('nav');
  document.body.appendChild(info);

  if (localStorage.getItem('time') === 'undefined') localStorage.setItem('time', '0');
  const timer = document.createElement('div');
  timer.classList.add('timer');
  if (localStorage.getItem('theme') === 'black') timer.classList.add('white');
  timer.innerText = `Time: ${localStorage.getItem('time')} seconds`;
  info.appendChild(timer);

  if (localStorage.getItem('click') === 'undefined') localStorage.setItem('click', '0');
  const countNumb = document.createElement('div');
  countNumb.classList.add('countNumb');
  if (localStorage.getItem('theme') === 'black') countNumb.classList.add('white');
  countNumb.innerText = `Number of click: ${localStorage.getItem('click')}`;
  info.appendChild(countNumb);

  const gameFieldContainer = document.createElement('div');
  gameFieldContainer.classList.add('gameFieldContainer');
  document.body.appendChild(gameFieldContainer);

  const gameField = document.createElement('div');
  gameField.classList.add('game-field');
  if (localStorage.getItem('theme') === 'black') {
    gameField.classList.add('gameFieldBlack');
  }
  gameFieldContainer.appendChild(gameField);

  const bombSound = document.createElement('audio');
  bombSound.setAttribute('id', 'bombSound');
  bombSound.setAttribute('src', 'assets/sound/lose.wav');
  document.body.appendChild(bombSound);

  const flagSound = document.createElement('audio');
  flagSound.setAttribute('id', 'flagSound');
  flagSound.setAttribute('src', 'assets/sound/click.wav');
  document.body.appendChild(flagSound);

  const clickSound = document.createElement('audio');
  clickSound.setAttribute('id', 'clickSound');
  clickSound.setAttribute('src', 'assets/sound/tick.mp3');
  document.body.appendChild(clickSound);

  const winSound = document.createElement('audio');
  winSound.setAttribute('id', 'winSound');
  winSound.setAttribute('src', 'assets/sound/win.mp3');
  document.body.appendChild(winSound);

  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    const row = document.createElement('div');
    row.classList.add('row');
    gameField.appendChild(row);
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      const cell = document.createElement('div');
      if (parameter !== 'new game' && (localStorage.getItem('resumeGame') === 'true')) {
        cell.className = localStorage.getItem(`class of ${i}Y${j}`);
        cell.innerText = localStorage.getItem(`inner of ${i}Y${j}`);
      } else cell.classList.add('cell');

      if (localStorage.getItem('theme') === 'black') cell.classList.add('cellBlack');
      cell.setAttribute('id', `${i}Y${j}`);
      row.appendChild(cell);
    }
  }

  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      const cell = document.getElementById(`${i}Y${j}`);
      if (localStorage.getItem('resumeGame') === 'false' && field[i][j].hasMine === true) {
        cell.classList.add('mine');
      }
    }
  }
}
createHTML();
