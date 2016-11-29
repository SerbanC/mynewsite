import animateBackground from './connectThree.js';
import TiltFx from './tiltHover.js';

(function(){
  // animateBackground();

  const tiltHoverableElements = document.querySelectorAll('.js-tiltFx');
  const options = {
    movement: {
      translation: {x: 15, y: 15, z: 15},
      rotation: {x: 15, y: -15, z: 0},
      reverseAnimation: {duration: 500, easing: 'easeOutQuad', elasticity: 500}
    }
  };

  new TiltFx(tiltHoverableElements, options);
})();
