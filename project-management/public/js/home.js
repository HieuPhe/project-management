/**
 * Tiny slider without dependencies
 * Features: autoplay, pause on hover, arrows, dots, keyboard, swipe.
 */
class MiniSlider {
  constructor(root, {interval = 4000, pauseOnHover = true} = {}) {
    this.root = root;
    this.track = root.querySelector('.slides');
    this.slides = [...root.querySelectorAll('.slide')];
    this.prevBtn = root.querySelector('.prev');
    this.nextBtn = root.querySelector('.next');
    this.dotsWrap = root.querySelector('.dots');
    this.index = 0;
    this.timer = null;
    this.interval = interval;
    this.pauseOnHover = pauseOnHover;

    this.makeDots();
    this.bind();
    this.go(0);
    this.play();
  }

  makeDots() {
    this.dotsWrap.innerHTML = '';
    this.dots = this.slides.map((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Chuyển đến banner ${i+1}`);
      b.addEventListener('click', () => this.go(i));
      this.dotsWrap.appendChild(b);
      return b;
    });
  }

  bind() {
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());

    // keyboard
    this.root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    this.root.tabIndex = 0; // focusable for keyboard

    // hover pause
    if (this.pauseOnHover) {
      this.root.addEventListener('mouseenter', () => this.pause());
      this.root.addEventListener('mouseleave', () => this.play());
    }

    // touch swipe
    let startX = 0, dx = 0, isTouch = false;
    this.root.addEventListener('touchstart', (e) => {
      isTouch = true;
      startX = e.touches[0].clientX;
      dx = 0;
      this.pause();
    }, {passive:true});

    this.root.addEventListener('touchmove', (e) => {
      if (!isTouch) return;
      dx = e.touches[0].clientX - startX;
      // optional: follow finger (visual)
      this.track.style.transition = 'none';
      this.track.style.transform = `translateX(calc(${-100*this.index}% + ${dx}px))`;
    }, {passive:true});

    const endSwipe = () => {
      if (!isTouch) return;
      this.track.style.transition = '';
      if (Math.abs(dx) > 60) {
        dx < 0 ? this.next() : this.prev();
      } else {
        this.go(this.index); // snap back
      }
      isTouch = false; dx = 0;
      this.play();
    };
    this.root.addEventListener('touchend', endSwipe);
    this.root.addEventListener('touchcancel', endSwipe);

    // resize snap
    window.addEventListener('resize', () => this.go(this.index));
  }

  go(i) {
    this.index = (i + this.slides.length) % this.slides.length;
    this.track.style.transform = `translateX(-${this.index * 100}%)`;
    this.slides.forEach((s, n) => s.classList.toggle('is-active', n === this.index));
    this.dots.forEach((d, n) => d.classList.toggle('is-active', n === this.index));
  }

  next(){ this.go(this.index + 1); }
  prev(){ this.go(this.index - 1); }

  play() {
    this.pause();
    this.timer = setInterval(() => this.next(), this.interval);
  }
  pause() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }
}

// Init sliders
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroSlider');
  const bottom = document.getElementById('bottomSlider');
  if (hero) new MiniSlider(hero, {interval: 4500});
  if (bottom) new MiniSlider(bottom, {interval: 3500});
});
