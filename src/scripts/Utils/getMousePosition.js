/**
 * Gets the mouse pointer position.
 * From {@link http://www.quirksmode.org/js/events_properties.html#position}.
 * @param {Object} [e = window.event] - Event
 * @returns {Object} - x and y coordinates
 */
export default function getMousePosition(e = window.event) {
  let posx = 0;
  let posy = 0;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return { x: posx, y: posy };
}
