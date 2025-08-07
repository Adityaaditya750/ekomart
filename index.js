
// Countdown Timer for Promo Bar
const promoDays = document.getElementById('promo-days');
const promoHours = document.getElementById('promo-hours');
const promoMinutes = document.getElementById('promo-minutes');
const promoSeconds = document.getElementById('promo-seconds');

// Set initial countdown (in seconds) for 20 days, 23 hours, 28 minutes, 40 seconds
let totalSeconds = (20 * 24 * 60 * 60) + (23 * 60 * 60) + (28 * 60) + 40;

function updatePromoCountdown() {
  if (totalSeconds <= 0) return;
  let days = Math.floor(totalSeconds / (24 * 60 * 60));
  let hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  let minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  let seconds = totalSeconds % 60;
  promoDays.textContent = days.toString().padStart(2, '0');
  promoHours.textContent = hours.toString().padStart(2, '0');
  promoMinutes.textContent = minutes.toString().padStart(2, '0');
  promoSeconds.textContent = seconds.toString().padStart(2, '0');
  totalSeconds--;
}
updatePromoCountdown();
setInterval(updatePromoCountdown, 1000);


  // Category Bar Smooth Infinite Auto-Scroll, Pause on Hover
  document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.category-track');
    let items = Array.from(document.querySelectorAll('.category-item'));
    let index = 0;
    let intervalId = null;

    // Clone first and last few cards for seamless infinite scroll
    function cloneForInfinite() {
      const cloneCount = 3; // Number of cards to clone at each end
      for (let i = 0; i < cloneCount; i++) {
        let firstClone = items[i].cloneNode(true);
        let lastClone = items[items.length - 1 - i].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, track.firstChild);
      }
      items = Array.from(track.querySelectorAll('.category-item'));
    }

    cloneForInfinite();

    // Set initial scroll to first real card
    function setInitialScroll() {
      track.scrollLeft = items[3].offsetLeft;
      index = 3;
    }
    setInitialScroll();

    function scrollToCard(idx) {
      if (items[idx]) {
        track.scrollTo({
          left: items[idx].offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    function startAutoScroll() {
      intervalId = setInterval(() => {
        index++;
        scrollToCard(index);
      }, 2000);
    }

    function stopAutoScroll() {
      clearInterval(intervalId);
    }

    // Pause on hover over any card
    items.forEach(card => {
      card.addEventListener('mouseenter', stopAutoScroll);
      card.addEventListener('mouseleave', startAutoScroll);
    });
    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);

    // Infinite loop logic: if at end, jump to real start; if at start, jump to real end
    track.addEventListener('scroll', () => {
      let realCount = items.length - 6; // 3 clones at each end
      if (track.scrollLeft <= items[2].offsetLeft) {
        // Jump to real end
        track.scrollLeft = items[realCount + 2].offsetLeft;
        index = realCount + 2;
      } else if (track.scrollLeft >= items[realCount + 3].offsetLeft) {
        // Jump to real start
        track.scrollLeft = items[3].offsetLeft;
        index = 3;
      } else {
        // Update index to closest
        let closest = 0;
        let minDist = Infinity;
        items.forEach((item, i) => {
          let dist = Math.abs(track.scrollLeft - item.offsetLeft);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        index = closest;
      }
    });

    // On resize, reset scroll
    window.addEventListener('resize', setInitialScroll);

    startAutoScroll();
  });

// Login state logic for nav button
document.addEventListener('DOMContentLoaded', function() {
  var navBtn = document.getElementById('nav-login-btn');
  if (navBtn) {
    function updateNavBtn() {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        navBtn.textContent = 'Logout';
        navBtn.href = '#';
        navBtn.classList.remove('btn-success');
        navBtn.classList.add('btn-danger');
      } else {
        navBtn.textContent = 'Login';
        navBtn.href = 'logiin.html';
        navBtn.classList.remove('btn-danger');
        navBtn.classList.add('btn-success');
      }
    }
    updateNavBtn();
    navBtn.addEventListener('click', function(e) {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        e.preventDefault();
        localStorage.removeItem('isLoggedIn');
        updateNavBtn();
        alert('You have been logged out.');
      }
    });
  }

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1800, // even smoother
      easing: 'ease-in-out-cubic', // more attractive easing
      once: false, // allow repeat animation
      delay: 0,
      offset: 80 // triggers a bit later for smoothness
    });
  }
});
