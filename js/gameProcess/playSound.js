import { layout } from '../gameProcess';

export function playSound(type) {
  const isSpeakerOn = localStorage.getItem('speaker') === 'on';
  if (type === 'soundToggle') {
    if (!layout.speaker.classList.contains('speakerOff') || !layout.speaker.classList.contains('speakerOffWhite')) {
      localStorage.setItem('speaker', 'off');
    }
    if (layout.speaker.classList.contains('speakerOff') || layout.speaker.classList.contains('speakerOffWhite')) {
      localStorage.setItem('speaker', 'on');
    }
    if (layout.themeBtn.classList.contains('themeBlack')) {
      layout.speaker.classList.toggle('speakerOffWhite');
      layout.speaker.classList.toggle('speakerOnWhite');
    }
    if (!layout.themeBtn.classList.contains('themeBlack')) {
      layout.speaker.classList.remove('speakerOffWhite');
      layout.speaker.classList.toggle('speakerOff');
      layout.speaker.classList.toggle('speakerOn');
    }
  }

  if (isSpeakerOn) {
    switch (type) {
      case 'lose': layout.bombSound.play();
        break;
      case 'flag': layout.flagSound.play();
        break;
      case 'click': layout.clickSound.play();
        break;
      case 'win': layout.winSound.play();
    }
  }
}
