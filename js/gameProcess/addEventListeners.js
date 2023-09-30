import {showCell} from "./showCell";
import {markBomb} from "./markBomb";
import {startNewGame} from "./startNewGame";
import {playSound} from "./playSound";
import {showResults} from "./showResults";
import {changeTheme} from "./changeTheme";
import {saveGame} from "./saveGame";
import {selectEl} from "../createHTML";
import {changeLevel} from "./changeLevel";
import {cells, newGameBtn, resultsBtn, speaker, themeBtn} from "../gameProcess";

cells.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    showCell(event);
  });
  cell.addEventListener('contextmenu', markBomb);
});

newGameBtn.addEventListener('click', startNewGame);
speaker.addEventListener('click', () => playSound('soundToggle'));
resultsBtn.addEventListener('click', showResults);
themeBtn.addEventListener('click', changeTheme);
window.addEventListener('beforeunload', saveGame);
selectEl.addEventListener('change', changeLevel);
