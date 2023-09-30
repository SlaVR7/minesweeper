import {bombSound, clickSound, flagSound, speaker, themeBtn, winSound} from "../gameProcess";

export function playSound(type) {
  const isSpeakerOn = localStorage.getItem('speaker') === 'on';
  if (type === 'soundToggle') {
    if (!speaker.classList.contains('speakerOff') || !speaker.classList.contains('speakerOffWhite')) {
      localStorage.setItem('speaker', 'off');
    }
    if (speaker.classList.contains('speakerOff') || speaker.classList.contains('speakerOffWhite')) {
      localStorage.setItem('speaker', 'on');
    }
    if (themeBtn.classList.contains('themeBlack')) {
      speaker.classList.toggle('speakerOffWhite');
      speaker.classList.toggle('speakerOnWhite');
    }
    if (!themeBtn.classList.contains('themeBlack')) {
      speaker.classList.remove('speakerOffWhite');
      speaker.classList.toggle('speakerOff');
      speaker.classList.toggle('speakerOn');
    }
  }

  if (isSpeakerOn) {
    switch (type) {
      case 'lose': bombSound.play();
        break;
      case 'flag': flagSound.play();
        break;
      case 'click': clickSound.play();
        break;
      case 'win': winSound.play();
    }
  }

}
