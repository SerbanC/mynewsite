/*
 * Based on Connect Three background animation from CoDrops
 * http://tympanus.net/Development/AnimatedHeaderBackgrounds/
 */

/* eslint-disable no-duplicate-imports */
import TweenLite from 'gsap';
import Circ from 'gsap';
/* eslint-enable */

export default function animateBackground() {
  let width;
  let height;
  let target;
  const animateHeader = true;
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
      if (p.closest.hasOwnProperty(i) && {}.hasOwnProperty.call(p.closest, i)) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest[i].x, p.closest[i].y);
        // ctx.strokeStyle = colorArray[Math.floor(Math.random() * colorArray.length)].call(this, p.active);
        ctx.strokeStyle = `rgba(89, 185, 204, ${p.active})`;
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

  function initDrawing() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = { x: width / 2, y: height / 2 };
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
        const p = {
          x: px,
          originX: px,
          y: py,
          originY: py
        };
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
        points[i].circle = new Circle(points[i], 2 + Math.random() * 2, fillColor);
      }
    }
  }

  // Event handling

  // Originally used to shut down the animation when the canvas was offscreen.
  // function scrollCheck() {
  //   return animateHeader = !(document.body.scrollTop > height);
  // }

  function mouseMove(e) {
    // let posX;
    // let posY;
    // if (e.pageX || e.pageY) {
    //   posX = e.pageX - window.scrollX;
    //   posY = e.pageY - window.scrollY;
    // } else if (e.clientX || e.clientY) {
    //   posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    //   posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    // }
    if (e.clientX || e.clientY) {
      // Option 1: Tween the target point to the cursor position
      return TweenLite.to(target, 0.5 + Math.random(), {
        x: e.clientX,
        y: e.clientY,
        ease: Circ.easeInOut
      });

      // Option 2: Reset the target point to the cursor position
      // target.x = posX;
      // target.y = posY;
    }
    return null;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function addListeners() {
    if (!('ontouchstart' in window)) {
      window.addEventListener('mousemove', mouseMove);
    }
    // No longer needed, check ::132
    // window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  // animation
  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (const i in points) {
        if (points.hasOwnProperty(i)) {
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
    }
    requestAnimationFrame(animate);
  }

  function shiftPoint(p) {
    TweenLite.to(p, 1 + Math.random(), {
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
      if (points.hasOwnProperty(i) && {}.hasOwnProperty.call(points, i)) {
        shiftPoint(points[i]);
      }
    }
  }

  // Main
  initDrawing();
  initAnimation();
  addListeners();
}
