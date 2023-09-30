import { resultsArr } from "../gameProcess";
import {createElement} from "../layout/createElement";

export function showResults() {
  const wrapper = createElement('div', 'wrapper wrapper2');
  const closeBtn = createElement('div', 'closeBtn');
  const slashBtn = createElement('div', 'slashBtn');
  const slashBtn2 = createElement('div', 'slashBtn2');
  const resultsTitle = createElement('h2', 'resultsTitle', 'Your last 10 results:');

  document.body.append(wrapper);
  wrapper.append(closeBtn, resultsTitle);
  closeBtn.append(slashBtn, slashBtn2);

  if (resultsArr && resultsArr.length > 0) {
    for (let i = 0; i <= resultsArr.length - 1; i++) {
      const result = createElement('div', 'result', resultsArr[i]);
      wrapper.append(result);
    }
  }

  closeBtn.addEventListener('click', () => document.body.removeChild(wrapper));
}
