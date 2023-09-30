import {getNum} from "./getNum";
import {selectMinesEl} from "../createHTML";
import {numberOfOpenedCells} from "../gameProcess";
import {gameOver} from "./gameOver";

export function countMinesAround(event) {
  const cellClasses = event.target.classList;
  const level = +localStorage.getItem('level');
  if (cellClasses.contains('invisible') || event.target.innerText !== '') {
    return;
  }

  const currentCellId = event.target.getAttribute('id');
  const oxPosition = getNum(currentCellId, 'left');
  const oyPosition = getNum(currentCellId, 'right');

  const leftCell = document.getElementById(`${oxPosition - 1}Y${oyPosition}`);
  const leftTopCell = document.getElementById(`${oxPosition - 1}Y${oyPosition - 1}`);
  const topCell = document.getElementById(`${oxPosition}Y${oyPosition - 1}`);
  const topRightCell = document.getElementById(`${oxPosition + 1}Y${oyPosition - 1}`);
  const rightCell = document.getElementById(`${oxPosition + 1}Y${oyPosition}`);
  const rightBottomCell = document.getElementById(`${oxPosition + 1}Y${oyPosition + 1}`);
  const bottomCell = document.getElementById(`${oxPosition}Y${oyPosition + 1}`);
  const bottomLeftCell = document.getElementById(`${oxPosition - 1}Y${oyPosition + 1}`);
  const aroundCells = [leftCell, leftTopCell, topCell, topRightCell, rightCell, rightBottomCell,
    bottomCell, bottomLeftCell];
  let numberOfMinesAround = 0;

  aroundCells.forEach((item) => {
    if (item && item.classList.contains('mine')) numberOfMinesAround += 1;
  });

  if (numberOfMinesAround === 0 && !cellClasses.contains('bomb-here')) {
    cellClasses.add('invisible');
    aroundCells.forEach((neighbourCell) => {
      let neighbourId;
      if (neighbourCell) {
        neighbourId = neighbourCell.getAttribute('id');
      }
      if (neighbourId && !neighbourCell.classList.contains('mine') && !neighbourCell.classList.contains('invisible')) {
        countMinesAround({ target: neighbourCell });
      }
    });
  }

  if (numberOfMinesAround !== 0) {
    cellClasses.remove('bomb-here');
    event.target.innerText = numberOfMinesAround;
    const colorClasses = ['white', 'blue', 'yellow', 'orange', 'green', 'violet', 'brown', 'pink'];
    cellClasses.add(colorClasses[numberOfMinesAround - 1]);
  }
  numberOfOpenedCells = 0;

  for (let i = 0; i < level; i += 1) {
    for (let j = 0; j < level; j += 1) {
      const currentCell = document.getElementById(`${i}Y${j}`);
      if (currentCell.classList.contains('invisible') || currentCell.innerText !== '') {
        numberOfOpenedCells += 1;
      }
    }
  }

  if (numberOfOpenedCells === (level ** 2) - selectMinesEl.valueAsNumber) {
    gameOver('win');
  }
}
