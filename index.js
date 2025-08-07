
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
