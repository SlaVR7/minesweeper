import {cells, countNumb, gameField, levelTitle, minesTitle, speaker, themeBtn, timer, title} from "../gameProcess";

export function changeTheme(event) {
  const isSpeakerOn = localStorage.getItem('speaker') === 'on';
  const isElementHasBlackTheme = event.target.classList.contains('themeBlack');
  const isWhiteTheme = localStorage.getItem('theme') === 'white';

  document.body.classList.toggle('bodyBlack');

  if (isWhiteTheme) {
    localStorage.setItem('theme', 'black');
  } else {
    localStorage.setItem('theme', 'white');
  }

  const items = [title, timer, countNumb, minesTitle, levelTitle];
  items.forEach(item => item.classList.toggle('white'));
  cells.forEach((cell) => {
    cell.classList.toggle('cellBlack');
  });
  gameField.classList.toggle('gameFieldBlack');

  speaker.className = 'speaker';
  if (isSpeakerOn && isElementHasBlackTheme) {
    speaker.classList.add('speakerOn');
  } else if (!isSpeakerOn && !isElementHasBlackTheme) {
    speaker.classList.add('speakerOffWhite');
  } else if (isSpeakerOn && !isElementHasBlackTheme) {
    speaker.classList.add('speakerOnWhite');
  } else if (!isSpeakerOn && isElementHasBlackTheme) {
    speaker.classList.add('speakerOff');
  }

  themeBtn.classList.toggle('themeBlack');
}
