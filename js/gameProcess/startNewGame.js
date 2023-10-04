import { selectMinesEl } from '../createHTML';
import { gameParameters } from '../gameProcess';
import { resetParams } from './resetParams';

export function startNewGame() {
  localStorage.setItem('resumeGame', 'false');

  if (selectMinesEl.valueAsNumber < 10 || selectMinesEl.valueAsNumber > 99) {
    alert('Number of mines should be between 10 and 99!');
    selectMinesEl.valueAsNumber = 10;
    return;
  }

  localStorage.setItem('howMatchMines', selectMinesEl.valueAsNumber);
  gameParameters.lastTime = 0;
  gameParameters.resultTime = 0;
  gameParameters.resultClick = 0;

  resetParams();
}
