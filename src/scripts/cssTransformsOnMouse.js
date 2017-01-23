import anime from 'animejs';

import getMousePosition from 'Utils/getMousePosition';

/*!
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 *
 * Copyright 2016, Serban Carjan
 * http://serbancarjan.ro
 */

/**
 * Applies inline CSS transforms on mouse move
 */
export default class cssTransformsOnMouse {
  /**
   * Create the effects for a set of elements, optionally using a set of options
   * @param {NodeList} elements - The collection of Nodes that will receive the effects. Comes in as a StaticNodeList. Can use Array.prototype.slice.call(elements) to convert it to Array if needed
   * @param {Object} [options] - The options for the effects
   */
  constructor(elements, options) {
    /**
     * Holds the DOM nodes that will be animated
     * @type {NodeList}
     */
    this.animatableElements = elements;

    /**
     * Default options, will be overridden by instance param
     * @type {Object}
     */
    this.options = {
      movement: {
        translation: {
          x: 0,
          y: 0,
          z: 0
        },
        rotation: {
          x: -5,
          y: 5,
          z: 0
        },
        reverseAnimation: {
          duration: 1200,
          easing: 'easeOutElastic',
          elasticity: 600
        }
      }
    };

    Object.assign(this.options, options);
  }

  /**
   * mouseMove handler. Updates the transforms on the `animatableElement` based on the `event`
   * @param {Node} animatableElement - a DOM Node
   * @param {Object} event - the mouseMove event
   */
  handleMouseMove(animatableElement, event) {
    window.requestAnimationFrame(() => this.layout(event, animatableElement));
  }

  /**
   * mouseLeave handler
   * @param {Node} animatableElement - a DOM Node
   */
  handleMouseLeave(animatableElement) {
    window.requestAnimationFrame(() => {
      const opt = {
        targets: animatableElement,
        duration: this.options.movement.exitAnimation.duration,
        easing: this.options.movement.exitAnimation.easing,
        elasticity: this.options.movement.exitAnimation.elasticity,
        // scaleX: 1,
        // scaleY: 1,
        // scaleZ: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0
      };
      anime(opt);
    });
  }

  /**
   * Sets up event listeners for `mouseMove` and `mouseLeave` and their callbacks
   */
  init() {
    // Not sure what this does
    // const handleMouseEnter = (otherElements) => otherElements.forEach((el) => anime.remove(el));

    this.animatableElements.forEach((animatableElement) => {
      const animationCanvas = animatableElement.parentNode;
      // const elementPosition = elementsArray.indexOf(animatableElement);
      // const otherElements = elementsArray.filter(el => elementsArray.indexOf(el) !== elementPosition);

      // animationCanvas.addEventListener('mouseenter', handleMouseEnter.bind(null, otherElements));
      animationCanvas.addEventListener('mousemove', this.handleMouseMove.bind(this, animatableElement));
      animationCanvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this, animatableElement));
    });
  }

  /**
   * Sets the layout as inline transforms
   * @param {Object} event - mouse event on which the layout gets triggered
   * @param {Node} animatableElement - the node which receives the layout change
   */
  layout(event, animatableElement) {
    const mousepos = getMousePosition(event);
    const bounds = animatableElement.parentNode.getBoundingClientRect();
    // t = this.options.movement.translation !== undefined ? this.options.movement.translation || {x: 0, y: 0, z: 0} : {x: 0, y: 0, z: 0};
    // r = this.options.movement.rotation !== undefined ? this.options.movement.rotation || {x: 0, y: 0, z: 0} : {x: 0, y: 0, z: 0};
    const t = this.options.movement.translation;
    const r = this.options.movement.rotation;


    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    };

    const relmousepos = {
      x: mousepos.x - bounds.left - docScrolls.left,
      y: mousepos.y - bounds.top - docScrolls.top
    };

    const setRange = (obj) => {
      for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (obj[k] == undefined) {
            obj[k] = [0, 0];
          }
          else if (typeof obj[k] === 'number') {
            obj[k] = [-1 * obj[k], obj[k]];
          }
        }
      }
    };

    setRange(t);
    setRange(r);

    const transforms = {
      translation: {
        x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
        y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0],
        z: (t.z[1] - t.z[0]) / bounds.height * relmousepos.y + t.z[0],
      },
      rotation: {
        x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
        y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0],
        z: (r.z[1] - r.z[0]) / bounds.width * relmousepos.x + r.z[0]
      }
    };

    animatableElement.style.WebkitTransform = animatableElement.style.transform = `translateX(${transforms.translation.x}px) translateY(${transforms.translation.y}px) translateZ(${transforms.translation.z}px) rotateX(${transforms.rotation.x}deg) rotateY(${transforms.rotation.y}deg) rotateZ(${transforms.rotation.z}deg)`;
  }
}
