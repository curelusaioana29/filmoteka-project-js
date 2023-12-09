// Header Backgroun Change
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
}, 60000); // Change the time for Letters Jump
// Manipulate Scroll Buttons
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
