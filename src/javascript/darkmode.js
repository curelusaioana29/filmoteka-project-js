export function initializeDarkModeToggle() {
  const BUTTON_DARK_MODE = document.getElementsByClassName('dark-mode')[0];
  let svgDarkModeChild = document.getElementsByClassName('dark-mode')[2];
  const bodyStyle = document.getElementsByTagName("body")[0];

  // Load dark mode setting from local storage
  const isDarkModeOn = localStorage.getItem('darkMode') === 'true';

  let darkModeOn = function () {
    if (BUTTON_DARK_MODE.classList.contains('active')) {
      svgDarkModeChild.setAttribute(
        "href",
        "/filmoteka-project-js/filmoteka-icons.f7e9ceb7.svg#icon-dark-mode"
      );

      BUTTON_DARK_MODE.classList.remove('active');

      bodyStyle.setAttribute('style', 'background-color: #000000dd');
    } else {
      svgDarkModeChild.setAttribute(
        "href",
        "/filmoteka-project-js/filmoteka-icons.f7e9ceb7.svg#icon-light-mode"
      );

      BUTTON_DARK_MODE.classList.add('active');

      bodyStyle.setAttribute('style', 'background-color: #ffffffdd');
    }

    // Save dark mode setting to local storage
    localStorage.setItem('darkMode', BUTTON_DARK_MODE.classList.contains('active'));
  };

  // Set initial dark mode based on the stored setting
  if (isDarkModeOn) {
    darkModeOn();
  }

  BUTTON_DARK_MODE.onclick = darkModeOn;
}
initializeDarkModeToggle();
