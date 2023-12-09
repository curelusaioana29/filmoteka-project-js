export function initializeLettersJump() {
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
}
initializeLettersJump();