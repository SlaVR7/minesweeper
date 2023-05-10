const field = [],
  rows = 10,
  cols = 10;

//Create cells
for (let i = 0; i < rows; i++) {
  field[i] = [];
  for (let j = 0; j < cols; j++) {
    field[i][j] = {
      hasMine: false,
      id: `X${i}Y${j}`
    };
  }
}

//Place mines
function placeMines(mines) {

  for (let minesPlaced = 0; minesPlaced <= mines; minesPlaced++) {
    let row = Math.floor(Math.random() * rows);
    let col = Math.floor(Math.random() * cols);

    if (!field[row][col].hasMine) {
      field[row][col].hasMine = true;
    }
  }
}

// Вызов функции для размещения 10 мин на поле
placeMines(10);
console.log(field)