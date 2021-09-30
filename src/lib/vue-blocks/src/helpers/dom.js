/**
 * @param element {HTMLElement}
 * @return {{top: number, left: number}}
 */
export function getOffsetRect(element) {
  const box = element.getBoundingClientRect();

  const scrollTop = window.pageYOffset;
  const scrollLeft = window.pageXOffset;

  const top = box.top + scrollTop;
  const left = box.left + scrollLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export default {
  getOffsetRect,
};
