export const field = [];
export const rows = 10;
export const cols = 10;




// Create matrix
export function createMatrix() {
  for (let i = 0; i < rows; i += 1) {
    field[i] = [];
    for (let j = 0; j < cols; j += 1) {
      field[i][j] = {
        hasMine: false,
        checked: false,
        opened: false,
        id: `X${i + 1}Y${j + 1}`,
      };
    }
  }
}
createMatrix();

// Place mines
export function placeMines(mines) {
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


