const field = [];
const rows = 10;
const cols = 10;

// Create matrix
for (let i = 0; i < rows; i += 1) {
  field[i] = [];
  for (let j = 0; j < cols; j += 1) {
    field[i][j] = {
      hasMine: false,
      id: `X${i + 1}Y${j + 1}`,
    };
  }
}

// Place mines
export function placeMines(mines) {
  console.log('mines placed')
  for (let minesPlaced = 0; minesPlaced < mines;) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!field[row][col].hasMine) {
      field[row][col].hasMine = true;
      minesPlaced += 1;
    }
  }
}
placeMines(10);

export default {
  field,
  rows,
  cols,
};


