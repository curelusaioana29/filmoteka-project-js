// Header Background Changing
export function initializeBackgroundChange() {
  document.addEventListener('DOMContentLoaded', function () {
    const listItems = document.querySelectorAll('.background-list li');
    const intervalDuration = 60000; // Change the time for background change

    function moveDisplayedClass() {
      const currentDisplayed = document.querySelector(
        '.background-list .displayed'
      );
      currentDisplayed.classList.remove('displayed');

      const nextLi = currentDisplayed.nextElementSibling || listItems[0];
      nextLi.classList.add('displayed');
    }

    setInterval(moveDisplayedClass, intervalDuration);
  });
}
initializeBackgroundChange();