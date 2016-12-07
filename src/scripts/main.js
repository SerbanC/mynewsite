import smoothScroll from 'smooth-scroll';
import Trianglify from 'trianglify';

import animateBackground from './connectThree.js';
import TiltFx from './tiltHover.js';

const scrollConfig = {
  // callback: (destination, target) => {
  //   destination.querySelectorAll('.NavLink').forEach((navLink) => navLink.classList.remove('NavLink--hidden'));
  // }
};

function checkNavLinks() {
  document.querySelectorAll('.Panel').forEach((panel) => {
    const panelHeight = panel.offsetHeight;
    const offsetOfTopFromViewport = panel.getBoundingClientRect().top;
    const offsetOfBottomFromViewport = panel.getBoundingClientRect().bottom;

    panel.classList[1] === 'Info' && console.log(offsetOfTopFromViewport, offsetOfBottomFromViewport);
    if (offsetOfTopFromViewport < panelHeight / 2 && offsetOfBottomFromViewport > panelHeight / 2) {
      panel.querySelectorAll('.NavLink').forEach((navLink) => navLink.classList.contains('NavLink--hidden') && navLink.classList.remove('NavLink--hidden'));
    } else {
      panel.querySelectorAll('.NavLink').forEach((navLink) => !navLink.classList.contains('NavLink--hidden') && navLink.classList.add('NavLink--hidden'));
    }
  })
}


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
    reverseAnimation: {duration: 500, easing: 'easeOutQuad', elasticity: 500}
  }
};

(function () {
  animateBackground();
  smoothScroll.init(scrollConfig);

  // document.body.appendChild(pattern.svg()).classList.add('Background', 'Background--static');
  new TiltFx(tiltHoverableElements, options);
  window.addEventListener('scroll', checkNavLinks);
})();
