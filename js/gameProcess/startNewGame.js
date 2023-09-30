import { selectMinesEl } from "../createHTML";
import { lastTime, resultClick, resultTime } from "../gameProcess";
import { resetParams } from "./resetParams";

export function startNewGame() {
  localStorage.setItem('resumeGame', 'false');

  if (selectMinesEl.valueAsNumber < 10 || selectMinesEl.valueAsNumber > 99) {
    alert('Number of mines should be between 10 and 99!');
    selectMinesEl.valueAsNumber = 10;
    return;
  }

  localStorage.setItem('howMatchMines', selectMinesEl.valueAsNumber);
  lastTime = 0;
  resultTime = 0;

  resultClick = 0;

  resetParams();
}
