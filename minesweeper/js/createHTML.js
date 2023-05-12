import game from './placeMines';

function createHTML() {
  const heading = document.createElement('h1');
  heading.classList.add('title');
  heading.innerText = 'Welcome to Minesweeper!';
  document.body.appendChild(heading);

  const gameField = document.createElement('div');
  gameField.classList.add('game-field');
  document.body.appendChild(gameField);

  for (let i = 0; i < 10; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    gameField.appendChild(row);
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
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









