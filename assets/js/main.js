// index Scroll
if (document.body.classList.contains('is-index')) {
  initScrollTheme();
}

function initScrollTheme() {
  const topColor = hexToRgb('#4D3C8B');
  const midColor = hexToRgb('#3B296C');
  const bottomColor = hexToRgb('#2A1E53');

  const textTopColor = hexToRgb('#fde9ff');
  const textBottomColor = hexToRgb('#f2f2f2');

  function handleScrollAnimation() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll === 0 ? 0 : scrollY / maxScroll;

    let bgColor;
    if (scrollProgress < 0.5) {
      bgColor = interpolateColor(topColor, midColor, scrollProgress / 0.5);
    } else {
      bgColor = interpolateColor(midColor, bottomColor, (scrollProgress - 0.5) / 0.5);
    }
    document.body.style.backgroundColor = rgbToCss(bgColor);

    const textColor = interpolateColor(textTopColor, textBottomColor, scrollProgress);
    const cssTextColor = rgbToCss(textColor);

    document.querySelectorAll('.dynamic-color, .typed, .skill .label, .skill .val').forEach(el => {
      el.style.color = cssTextColor;
    });

    const cursor = document.querySelector('.typed-cursor');
    if (cursor) cursor.style.color = cssTextColor;
  }

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  }

  function rgbToCss(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  function interpolateColor(c1, c2, f) {
    return c1.map((v, i) => Math.round(v + f * (c2[i] - v)));
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScrollAnimation();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('load', () => {
    handleScrollAnimation();
    window.dispatchEvent(new Event('scroll'));
  });
}


// hero type Init typed.js
const selectTyped = document.querySelector('.typed');
if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
}

AOS.init({
duration: 800,
once: true
});


// Animation on scroll function and init
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
window.addEventListener('load', aosInit);


// Animate the skills items on reveal
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.skills-animation').forEach((item) => {
    new Waypoint({
      element: item,
      context: window,
      offset: '80%',
      handler: function () {
        item.querySelectorAll('.progress-bar').forEach(bar => {
          const value = bar.getAttribute('aria-valuenow');
          if (value) {
            bar.style.width = value + '%';
          }
        });
        this.destroy(); // 한 번만 실행
      }
    });
  });
});

// 스크롤 이벤트 한 번 강제 발생 (fallback)
window.addEventListener('load', () => window.dispatchEvent(new Event('scroll')));


// Correct scrolling position upon page load for URLs containing hash links.
window.addEventListener('load', function(e) {
  if (window.location.hash) {
    if (document.querySelector(window.location.hash)) {
      setTimeout(() => {
        let section = document.querySelector(window.location.hash);
        let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});


// Mobile nav toggle
const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

function mobileNavToogle() {
  document.querySelector('body').classList.toggle('mobile-nav-active');
  mobileNavToggleBtn.classList.toggle('bi-list');
  mobileNavToggleBtn.classList.toggle('bi-x');
}
if (mobileNavToggleBtn) {
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
}

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });