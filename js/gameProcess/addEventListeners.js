import { showCell } from './showCell';
import { markBomb } from './markBomb';
import { startNewGame } from './startNewGame';
import { playSound } from './playSound';
import { showResults } from './showResults';
import { changeTheme } from './changeTheme';
import { saveGame } from './saveGame';
import { selectEl } from '../createHTML';
import { changeLevel } from './changeLevel';
import { layout } from '../gameProcess';

export function addEventListeners() {
  layout.cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      showCell(event);
    });
    cell.addEventListener('contextmenu', markBomb);
  });

  layout.newGameBtn.addEventListener('click', startNewGame);
  layout.speaker.addEventListener('click', () => playSound('soundToggle'));
  layout.resultsBtn.addEventListener('click', showResults);
  layout.themeBtn.addEventListener('click', changeTheme);
  window.addEventListener('beforeunload', saveGame);
  selectEl.addEventListener('change', () => changeLevel());
}
