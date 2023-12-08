// Header Backgroun Change
document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('.background-list li');
  const intervalDuration = 5000; // Change the time for background change

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
/** Letters Jump */
let letterList = document.querySelectorAll('.play-title');

function jumpLetters() {
  letterList.forEach(function (letter, index) {
    setTimeout(function () {
      letter.style.transition = 'transform 0.2s ease-in-out';
      letter.style.transform = 'translateY(-15px)';

      setTimeout(function () {
        letter.style.transition = '';
        letter.style.transform = 'translateY(0)';
      }, 200);
    }, index * 100);
  });
}

jumpLetters();

setInterval(function () {
  jumpLetters();
}, 5000); // Change the time for Letters Jump
// Manipulate