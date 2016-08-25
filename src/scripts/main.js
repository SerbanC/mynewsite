import animateBackground from './connectThree.js';

const title = document.querySelector('.Title');
const tabs = document.querySelectorAll('.js-navTab');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    if (!title.classList.contains('Title--collapsed')) {
      title.classList.add('Title--collapsed');
    }

    // e.stopPropagation();
    // console.log(e);
  });
});

// window.tabClicked = function tabClicked(ev, el) {
//   // ev.preventDefault();
//   console.log('Clicked', ev, el);
// };

(animateBackground)();
