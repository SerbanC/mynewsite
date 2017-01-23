import smoothScroll from 'smooth-scroll';
// import Trianglify from 'trianglify';

import animateBackground from './backgroundAnimation.js';
import TiltFx from './cssTransformsOnMouse.js';
import checkIfInViewport from './Utils/checkIfInViewport';

const panels = document.querySelectorAll(('.Panel'));

/*const pattern = Trianglify({
  // variance: 0.75,
  // seed: 'b4a16',
  // x_colors: 'random',
  height: window.innerHeight,
  width: window.innerWidth,
  // cell_size: 75
});*/

const tiltableElements = document.querySelectorAll('.js-tiltFx');
const tiltableOptions = {
  movement: {
    translation: { x: 15, y: 15, z: 15 },
    rotation: { x: 15, y: -15, z: 0 },
    enterAnimation: { duration: 100, easing: 'easeInQuad', elasticity: 600 },
    exitAnimation: { duration: 500, easing: 'easeOutElastic', elasticity: 100 }
  }
};
const tiltables = new TiltFx(tiltableElements, tiltableOptions);

function toggleNavLinks(elements) {
  for (let i = 0; i < Object.keys(elements).length; i++) {
    if (elements[Object.keys(elements)[i]]) {
      const visiblePanel = document.querySelector(`#${Object.keys(elements)[i]}`);

      visiblePanel.querySelectorAll('.NavLink').forEach((navLink) => {
        navLink.classList.remove('NavLink--hidden');
      });
    } else {
      const invisiblePanel = document.querySelector(`#${Object.keys(elements)[i]}`);

      invisiblePanel.querySelectorAll('.NavLink').forEach((navLink) => {
        navLink.classList.add('NavLink--hidden');
      });
    }
  }
}

(() => {
  animateBackground();
  smoothScroll.init();
  // document.body.appendChild(pattern.svg()).classList.add('Background', 'Background--static');
  tiltables.init();
  window.addEventListener('scroll', checkIfInViewport.bind(null, panels, 'id', toggleNavLinks));
})();
