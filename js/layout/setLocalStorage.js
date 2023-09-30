export function setLocalStorage() {
  if (!localStorage.getItem('howMatchMines')) {
    localStorage.setItem('howMatchMines', '10');
  }
  if (!localStorage.getItem('resumeGame')) {
    localStorage.setItem('resumeGame', 'false');
  }
  if (!localStorage.getItem('time')) {
    localStorage.setItem('time', '0');
  }
  if (!localStorage.getItem('click')) {
    localStorage.setItem('click', '0');
  }
  if (!localStorage.getItem('level')) {
    localStorage.setItem('level', '10');
  }
}
