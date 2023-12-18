export function initializeScrollButtons() {
  document.addEventListener('DOMContentLoaded', function () {
    const topArrow = document.querySelector('.arrows a[href="#top"]');
    const bottomArrow = document.querySelector('.arrows a[href="#bottom"]');

    const middleOfPage = window.innerHeight / 2;

    const prevScrollPosition = window.scrollY;

    function handleScroll() {
      const scrollPosition = window.scrollY;

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