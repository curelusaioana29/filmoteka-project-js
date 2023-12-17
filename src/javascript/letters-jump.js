// Header Letters Jump
export function initializeLettersJump() {
  let letterList = document.querySelectorAll('.play-title');

  function jumpLetters() {
    letterList.forEach(function (letter, index) {
      setTimeout(function () {
        letter.style.transition = 'transform 0.3s ease-in-out';
        letter.style.transform = 'translateY(-15px)';

        setTimeout(function () {
          letter.style.transition = '';
          letter.style.transform = 'translateY(0)';
        }, 350);
      }, index * 100);
    });
  }

  jumpLetters();

  setInterval(function () {
    jumpLetters();
  }, 10000); // Change the time for Letters Jump
}
initializeLettersJump();