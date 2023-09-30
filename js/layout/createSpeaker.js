export function createSpeaker(isBlackTheme, isSpeakerOn) {
  const speaker = document.createElement('div');
  if (isBlackTheme && isSpeakerOn) {
    speaker.className = 'speaker speakerOnWhite';
  } else if (isBlackTheme && !isSpeakerOn) {
    speaker.className = 'speaker speakerOffWhite';
  } else if (!isBlackTheme && !isSpeakerOn) {
    speaker.className = 'speaker speakerOff';
  } else if (!isBlackTheme && isSpeakerOn) {
    speaker.className = 'speaker speakerOn';
  } else {
    speaker.className = 'speaker speakerOn';
    localStorage.setItem('speaker', 'on');
  }
  return speaker;
}
