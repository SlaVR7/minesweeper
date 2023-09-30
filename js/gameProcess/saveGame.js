import {cells, click, numberOfOpenedCells, resultClick, resultTime} from "../gameProcess";

export function saveGame() {
  for (let i = 0; i < localStorage.getItem('level') ** 2; i += 1) {
    const currentClassesKey = `class of ${cells[i].getAttribute('id')}`;
    const currentClasses = cells[i].className;
    const currentInner = cells[i].innerText;
    const currentInnerKey = `inner of ${cells[i].getAttribute('id')}`;
    localStorage.setItem(currentClassesKey, currentClasses);
    localStorage.setItem(currentInnerKey, currentInner);
  }
  if (click > 0) {
    localStorage.setItem('time', resultTime);
    localStorage.setItem('click', resultClick);
  }
  if (numberOfOpenedCells > 0) {
    localStorage.setItem('isFirstMove', 'false');
    localStorage.setItem('resumeGame', 'true');
  }
}
