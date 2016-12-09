import smoothScroll from 'smooth-scroll';
import Trianglify from 'trianglify';

import animateBackground from './connectThree.js';
import TiltFx from './tiltHover.js';

function checkNavLinks(panels) {
  panels.forEach((panel) => {
    const panelHeight = panel.offsetHeight;
    const offsetOfTopFromViewport = panel.getBoundingClientRect().top;
    const offsetOfBottomFromViewport = panel.getBoundingClientRect().bottom;

    if (offsetOfTopFromViewport < panelHeight / 2 && offsetOfBottomFromViewport > panelHeight / 2) {
      panel.querySelectorAll('.NavLink').forEach((navLink) => navLink.classList.contains('NavLink--hidden') && navLink.classList.remove('NavLink--hidden'));
    } else {
      panel.querySelectorAll('.NavLink').forEach((navLink) => !navLink.classList.contains('NavLink--hidden') && navLink.classList.add('NavLink--hidden'));
    }
  })
}

const panels = document.querySelectorAll(('.Panel'));

const pattern = Trianglify({
  // variance: 0.75,
  // seed: 'b4a16',
  // x_colors: 'random',
  height: window.innerHeight,
  width: window.innerWidth,
  // cell_size: 75
});

const tiltHoverableElements = document.querySelectorAll('.js-tiltFx');
const options = {
  movement: {
    translation: {x: 15, y: 15, z: 15},
    rotation: {x: 15, y: -15, z: 0},
    enterAnimation: {duration: 100, easing: 'easeInQuad', elasticity: 600},
    exitAnimation: {duration: 500, easing: 'easeOutElastic', elasticity: 100}
  }
};

(() => {
  animateBackground();
  smoothScroll.init();
  // document.body.appendChild(pattern.svg()).classList.add('Background', 'Background--static');
  new TiltFx(tiltHoverableElements, options);
  window.addEventListener('scroll', checkNavLinks.bind(null, panels));
})();
