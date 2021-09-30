import { getOffsetRect } from './dom';

/**
 * @param event {MouseEvent}
 * @param element {HTMLElement}
 * @return {{x: number, y: number}}
 */
export function getMousePosition(element, event) {
  const mouseX =
    event.pageX || event.clientX + document.documentElement.scrollLeft;
  const mouseY =
    event.pageY || event.clientY + document.documentElement.scrollTop;

  const offset = getOffsetRect(element);
  const x = mouseX - offset.left;
  const y = mouseY - offset.top;

  return {
    x: x,
    y: y,
  };
}

export default {
  getMousePosition,
};
