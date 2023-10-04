import { gameParameters, resultsArr } from '../gameProcess';
import { playSound } from './playSound';
import { startNewGame } from './startNewGame';
import { createElement } from '../layout/createElement';

export function gameOver(result) {
  gameParameters.endTime = new Date();

  const timer = Math.floor((gameParameters.endTime - gameParameters.startTime) / 1000);

  const wrapper = createElement('div', 'wrapper');
  const resultString = createElement('div', 'game-over');
  const newGameBtn2 = createElement('button', 'new-game', 'New game');

  if (result === 'lose') {
    resultString.innerText = 'Game over. Try again';
  } else {
    resultString.innerText = `Hooray! You found all mines in ${timer} seconds and ${gameParameters.click} moves!`;
    playSound('win');
    resultsArr.push(`Time: ${timer}, Moves: ${gameParameters.click}`);
    localStorage.setItem('results', JSON.stringify(resultsArr));
  }

  document.body.append(wrapper);
  wrapper.append(resultString, newGameBtn2);

  clearTimeout(gameParameters.timerId);
  localStorage.setItem('time', '0');
  newGameBtn2.addEventListener('click', startNewGame);
}
