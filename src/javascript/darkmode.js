/** Dark / Light Mode */
export function initializeDarkModeToggle() {
  const BUTTON_DARK_MODE = document.getElementsByClassName('dark-mode')[0];
  let svgDarkModeChild = document.getElementsByClassName('dark-mode')[2];
  const bodyStyle = document.getElementsByTagName("body")[0];

  let darkModeOn = function () {
    if (BUTTON_DARK_MODE.classList.contains('active')) {
      svgDarkModeChild.setAttribute(
        "href",
        "/filmoteka-project-js/filmoteka-icons.12e6e143.svg#icon-dark-mode"
      );

      BUTTON_DARK_MODE.classList.remove('active');

      bodyStyle.setAttribute('style', 'background-color: #000000dd');
    } else {
      svgDarkModeChild.setAttribute(
        "href",
        "/filmoteka-project-js/filmoteka-icons.12e6e143.svg#icon-light-mode"
      );

      BUTTON_DARK_MODE.classList.add('active');

      bodyStyle.setAttribute('style', 'background-color: #ffffffdd');
    }
  };

  BUTTON_DARK_MODE.onclick = darkModeOn;
}
initializeDarkModeToggle();
