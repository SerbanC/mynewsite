import smoothScroll from 'smooth-scroll';
import Trianglify from 'trianglify';

import animateBackground from './connectThree.js';
import TiltFx from './tiltHover.js';

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

(function(){
  animateBackground();
  smoothScroll.init();

  document.body.appendChild(pattern.svg()).classList.add('Background');
  new TiltFx(tiltHoverableElements, options);
})();
