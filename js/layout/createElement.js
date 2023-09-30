export function createElement(tag, className, text, attributes) {
  const element = document.createElement(tag);
  element.className = className;
  if (text) {
    element.innerText = text;
  }
  if (attributes) {
    for (const attributesKey in attributes) {
      element.setAttribute(attributesKey, attributes[attributesKey]);
    }
  }
  return element;
}
