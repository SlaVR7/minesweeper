import game from './placeMines';

function createHTML() {

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

  const info = document.createElement('div');
  info.classList.add('nav');
  document.body.appendChild(info);

  const timer = document.createElement('div');
  timer.classList.add('timer');
  if (localStorage.getItem('theme') === 'black') timer.classList.add('white');
  timer.innerText = 'Time: 0';
  info.appendChild(timer);

  const countNumb = document.createElement('div');
  countNumb.classList.add('countNumb');
  if (localStorage.getItem('theme') === 'black') countNumb.classList.add('white');
  countNumb.innerText = 'Number of click: 0';
  info.appendChild(countNumb);

  const gameField = document.createElement('div');
  gameField.classList.add('game-field');
  if (localStorage.getItem('theme') === 'black') {
    gameField.classList.add('gameFieldBlack');
  }
  document.body.appendChild(gameField);

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

  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    gameField.appendChild(row);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (localStorage.getItem('theme') === 'black') cell.classList.add('cellBlack');
      cell.setAttribute('id', `X${i}Y${j}`);
      row.appendChild(cell);
    }
  }

  for (let i = 0; i < game.rows; i++) {
    for (let j = 0; j < game.cols; j++) {
      const cell = document.getElementById(`X${i}Y${j}`);

      if (game.field[i][j].hasMine) {
        cell.classList.add('mine');
      }
    }
  }
}
createHTML();

export default { createHTML };









