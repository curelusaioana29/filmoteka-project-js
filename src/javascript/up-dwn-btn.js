export function initializeScrollButtons() {
  document.addEventListener('DOMContentLoaded', function () {
    var topArrow = document.querySelector('.arrows a[href="#top"]');
    var bottomArrow = document.querySelector('.arrows a[href="#bottom"]');

    var middleOfPage = window.innerHeight / 2;

    var prevScrollPosition = window.scrollY;

    function handleScroll() {
      var scrollPosition = window.scrollY;

      if (scrollPosition > prevScrollPosition) {
        topArrow.style.display = 'flex';
        bottomArrow.style.display = 'none';
      } else {
        topArrow.style.display = 'none';
        bottomArrow.style.display = 'flex';
      }

      prevScrollPosition = scrollPosition;
    }

    window.addEventListener('scroll', handleScroll);

    handleScroll();
  });
}
initializeScrollButtons();