import {click, endTime, resultsArr, startTime, timerId} from "../gameProcess";
import {playSound} from "./playSound";
import {startNewGame} from "./startNewGame";
import {createElement} from "../layout/createElement";

export function gameOver(result) {
  endTime = new Date();

  const timer = Math.floor((endTime - startTime) / 1000);

  const wrapper = createElement('div', 'wrapper');
  const resultString = createElement('div', 'game-over');
  const newGameBtn2 = createElement('button', 'new-game', 'New game');

  if (result === 'lose') {
    resultString.innerText = 'Game over. Try again';
  } else {
    resultString.innerText = `Hooray! You found all mines in ${timer} seconds and ${click} moves!`;
    playSound('win');
    resultsArr.push(`Time: ${timer}, Moves: ${click}`);
    localStorage.setItem('results', JSON.stringify(resultsArr));
  }

  document.body.append(wrapper);
  wrapper.append(resultString, newGameBtn2);

  clearTimeout(timerId);
  localStorage.setItem('time', '0');
  newGameBtn2.addEventListener('click', startNewGame);
}
