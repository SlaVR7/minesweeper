import { layout, gameParameters } from '../gameProcess';

export function showCurrentGameTime() {
  gameParameters.currentTime = Math.floor((new Date() - gameParameters.startTime) / 1000);
  if (!isNaN(+gameParameters.lastTime)) {
    gameParameters.resultTime = +gameParameters.lastTime + +gameParameters.currentTime;
  } else gameParameters.resultTime = gameParameters.currentTime;

  layout.timer.innerText = `Time: ${gameParameters.resultTime} seconds`;
  gameParameters.timerId = setTimeout(showCurrentGameTime, 1000);
}
