import { field } from "../createHTML";

export function clearMines() {
  if (localStorage.getItem('resumeGame') === 'true') return;
  for (let i = 0; i < +localStorage.getItem('level'); i += 1) {
    for (let j = 0; j < +localStorage.getItem('level'); j += 1) {
      field[i][j].hasMine = false;
    }
  }
}
