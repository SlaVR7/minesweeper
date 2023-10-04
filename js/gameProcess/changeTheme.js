import { layout } from '../gameProcess';

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

  const items = [layout.title, layout.timer, layout.countNumb, layout.minesTitle, layout.levelTitle];
  items.forEach((item) => item.classList.toggle('white'));
  layout.cells.forEach((cell) => {
    cell.classList.toggle('cellBlack');
  });
  layout.gameField.classList.toggle('gameFieldBlack');

  layout.speaker.className = 'speaker';
  if (isSpeakerOn && isElementHasBlackTheme) {
    layout.speaker.classList.add('speakerOn');
  } else if (!isSpeakerOn && !isElementHasBlackTheme) {
    layout.speaker.classList.add('speakerOffWhite');
  } else if (isSpeakerOn && !isElementHasBlackTheme) {
    layout.speaker.classList.add('speakerOnWhite');
  } else if (!isSpeakerOn && isElementHasBlackTheme) {
    layout.speaker.classList.add('speakerOff');
  }

  layout.themeBtn.classList.toggle('themeBlack');
}
