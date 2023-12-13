/** Dark / Light Mode */
export const toggleDarkMode = () => {
  const HEAD = document.getElementsByTagName('head')[0];
  let headLink = document.createElement('link');

  const BUTTON_DARK_MODE = document.getElementsByClassName('dark-mode')[0];
  let svgDarkModeChild = document.getElementsByClassName('dark-mode')[0];

  let darkModeOn = function () {
    if (BUTTON_DARK_MODE.className === 'dark-mode activate') {
      HEAD.appendChild(headLink);
      headLink.rel = 'stylesheet';
      headLink.href = './css/darkmode.css';

      svgDarkModeChild.setAttribute(
        'href',
        './images/filmoteka-icons.svg#icon-light-mode'
      );

      BUTTON_DARK_MODE.className = 'dark-mode';
    } else {
      HEAD.removeChild(headLink);

      svgDarkModeChild.setAttribute(
        'href',
        './images/filmoteka-icons.svg#icon-dark-mode'
      );

      BUTTON_DARK_MODE.className = 'dark-mode activate';
    }
  };

  BUTTON_DARK_MODE.onclick = darkModeOn;
};
toggleDarkMode();