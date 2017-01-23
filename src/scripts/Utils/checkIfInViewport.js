/**
 * For a list of DOM Nodes, check whether they are in the viewport
 * @param {NodeList} nodes - A list of DOM Nodes
 * @param {String} selector - The HTML attribute to be converted into object keys for the result
 * @param {Function} [callback] - Function to run with the result
 * @returns {Function|Object} - { node[selector]: Boolean (...) }. If there is a callback provided call it with the result, otherwise just return the result
 */
export default function checkIfInViewport(nodes, selector, callback) {
  const nodesInViewport = {};

  nodes.forEach((node) => {
    const panelHeight = node.offsetHeight;
    const offsetOfTopFromViewport = node.getBoundingClientRect().top;
    const offsetOfBottomFromViewport = node.getBoundingClientRect().bottom;

    nodesInViewport[node[selector]] = offsetOfTopFromViewport < panelHeight / 2 && offsetOfBottomFromViewport > panelHeight / 2;
  });

  return callback ? callback(nodesInViewport) : nodesInViewport;
}
