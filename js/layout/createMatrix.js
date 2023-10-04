import { field } from '../gameProcess';

function createMatrix() {
  if (localStorage.getItem('resumeGame') === 'true') return;
  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    field[i] = [];
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      field[i][j] = {
        hasMine: false,
        checked: false,
        opened: false,
        id: `${i}Y${j}`,
      };
    }
  }
}

export default createMatrix;
