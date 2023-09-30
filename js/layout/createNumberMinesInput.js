export function createNumberMinesInput() {
  const selectMines = document.createElement('input');
  selectMines.setAttribute('id', 'selectMines');
  selectMines.setAttribute('type', 'number');
  selectMines.setAttribute('min', '10');
  selectMines.setAttribute('max', '99');
  selectMines.setAttribute('value', localStorage.getItem('howMatchMines'));
  return selectMines;
}
