import { gameParameters, layout } from '../gameProcess';

export function saveGame() {
  for (let i = 0; i < localStorage.getItem('level') ** 2; i += 1) {
    const currentClassesKey = `class of ${layout.cells[i].getAttribute('id')}`;
    const currentClasses = layout.cells[i].className;
    const currentInner = layout.cells[i].innerText;
    const currentInnerKey = `inner of ${layout.cells[i].getAttribute('id')}`;
    localStorage.setItem(currentClassesKey, currentClasses);
    localStorage.setItem(currentInnerKey, currentInner);
  }
  if (gameParameters.click > 0) {
    localStorage.setItem('time', gameParameters.resultTime);
    localStorage.setItem('click', gameParameters.resultClick);
  }
  if (gameParameters.numberOfOpenedCells > 0) {
    localStorage.setItem('isFirstMove', 'false');
    localStorage.setItem('resumeGame', 'true');
  }
}
