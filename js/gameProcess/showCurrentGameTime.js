import {timer, currentTime, resultTime, timerId, lastTime, startTime} from "../gameProcess";

export function showCurrentGameTime() {
  currentTime = Math.floor((new Date() - startTime) / 1000);
  if (!isNaN(+lastTime)) {
    resultTime = +lastTime + +currentTime;
  } else resultTime = currentTime;

  timer = document.querySelector('.timer');
  timer.innerText = `Time: ${resultTime} seconds`;
  timerId = setTimeout(showCurrentGameTime, 1000);
}
