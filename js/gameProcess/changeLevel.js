import { selectEl } from '../createHTML';
import { resetParams } from './resetParams';

export function changeLevel(field) {
  const level = selectEl.value;
  if (level === 'easy') {
    localStorage.setItem('level', '10');
    localStorage.setItem('howMatchMines', '10');
    resetParams(field);
  }
  if (level === 'medium') {
    localStorage.setItem('level', '15');
    localStorage.setItem('howMatchMines', '30');
    resetParams(field);
  }
  if (level === 'hard') {
    localStorage.setItem('level', '25');
    localStorage.setItem('howMatchMines', '70');
    resetParams(field);
  }
}
