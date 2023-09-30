import { field } from '../createHTML';

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
