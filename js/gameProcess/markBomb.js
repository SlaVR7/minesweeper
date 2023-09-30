import { playSound } from "./playSound";

export function markBomb(event) {
  event.preventDefault();
  if (!(event.target.classList.contains('invisible')) && event.target.innerText === '') {
    event.target.classList.toggle('bomb-here');
    playSound('flag');
  }
}
