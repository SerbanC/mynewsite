/*
 * Connect Three background animation from CoDrops
 */

import TweenLite from 'gsap';
// eslint-disable-next-line no-duplicate-imports
import Circ from 'gsap';

export default function animateBackground() {
  let width;
  let height;
  let homeScreen;
  let target;
  let animateHeader = true;
  let canvas;
  let ctx;
  let points;

  const colorHtml = (opacity) => `rgba(240, 101, 41, ${opacity})`;
  const colorCss = (opacity) => `rgba(51, 169, 220, ${opacity})`;
  const colorJs = (opacity) => `rgba(240, 191, 38, ${opacity})`;
  const colorHtmlStrong = (opacity) => `rgba(228, 81, 38, ${opacity})`;
  const colorCssStrong = (opacity) => `rgba(22, 115, 182, ${opacity})`;
  const colorJsStrong = (opacity) => `rgba(228, 162, 39, ${opacity})`;
  const colorArray = [colorHtml, colorCss, colorJs];
  const colorArrayStrong = [colorHtmlStrong, colorCssStrong, colorJsStrong];

  // Util
  function getDistance(p1, p2) {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }

  // Canvas manipulation
  function drawLines(p) {
    if (!p.active) return;
    for (const i in p.closest) {
      if ({}.hasOwnProperty.call(p.closest, i)) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        ctx.strokeStyle = colorArray[Math.floor(Math.random() * colorArray.length)].call(this, p.active);
        ctx.stroke();
      }
    }
  }

  function Circle(pos, rad, color) {
    const _this = this;

    // constructor
    (() => {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = () => {
      if (!_this.active) return;
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = _this.color.call(this, _this.active);
      ctx.fill();
    };
  }

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };

    homeScreen = document.getElementById('js-homeScreen');
    homeScreen.style.height = `${height}px`;

    canvas = document.getElementById('js-canvasBackground');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    // create points
    points = [];
    for (let x = 0; x < width; x = x + width / 20) {
      for (let y = 0; y < height; y = y + height / 20) {
        const px = x + Math.random() * width / 20;
        const py = y + Math.random() * height / 20;
        const p = { x: px, originX: px, y: py, originY: py };
        points.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.length; i++) {
      const closest = [];
      const p1 = points[i];
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        if (!(p1 === p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] === undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (const i in points) {
      if ({}.hasOwnProperty.call(points, i)) {
        const fillColor = colorArrayStrong[Math.floor(Math.random() * colorArray.length)];
        const c = new Circle(points[i], 2 + Math.random() * 2, fillColor);
        points[i].circle = c;
      }
    }
  }

  // Event handling
  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function mouseMove(e) {
    let posx;
    let posy;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    target.x = posx;
    target.y = posy;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    homeScreen.style.height = `${height}px`;
    canvas.width = width;
    canvas.height = height;
  }

  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  // animation
  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (const i in points) {
        // detect points in range
        if (Math.abs(getDistance(target, points[i])) < 4000) {
          points[i].active = 0.3;
          points[i].circle.active = 0.6;
        } else if (Math.abs(getDistance(target, points[i])) < 20000) {
          points[i].active = 0.1;
          points[i].circle.active = 0.3;
        } else if (Math.abs(getDistance(target, points[i])) < 40000) {
          points[i].active = 0.02;
          points[i].circle.active = 0.1;
        } else {
          points[i].active = 0;
          points[i].circle.active = 0;
        }

        drawLines(points[i]);
        points[i].circle.draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete() {
        shiftPoint(p);
      }
    });
  }

  function initAnimation() {
    animate();
    for (const i in points) {
      if ({}.hasOwnProperty.call(points, i)) shiftPoint(points[i]);
    }
  }

  // Main
  initHeader();
  initAnimation();
  addListeners();
}
