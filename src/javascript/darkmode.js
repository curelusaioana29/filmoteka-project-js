export function initializeDarkModeToggle() {
  const BUTTON_DARK_MODE = document.getElementsByClassName('dark-mode')[0];
  let svgDarkModeChild = document.getElementsByClassName('dark-mode')[2];
  const bodyStyle = document.getElementsByTagName('body')[0];
  const arrowsLink = document.getElementById('arrow-link');
  const arrowsSvg = document.getElementById('arrow-svg');

  // Function to set dark mode
  let setDarkMode = function () {
    svgDarkModeChild.setAttribute(
      'href',
      '/filmoteka-project-js/filmoteka-icons.f7e9ceb7.svg#icon-dark-mode'
    );

    BUTTON_DARK_MODE.classList.remove('active');

    bodyStyle.setAttribute('style', 'background-color: #000000dd');
    arrowsLink.setAttribute('style', 'border: 1px solid #fff');
    arrowsSvg.setAttribute('style', 'color: #fff');

    // Save user preference in localStorage
    localStorage.setItem('darkMode', 'on');
  };

  // Function to set light mode
  let setLightMode = function () {
    svgDarkModeChild.setAttribute(
      'href',
      '/filmoteka-project-js/filmoteka-icons.f7e9ceb7.svg#icon-light-mode'
    );

    BUTTON_DARK_MODE.classList.add('active');

    bodyStyle.setAttribute('style', 'background-color: #ffffffdd');

    // Save user preference in localStorage
    localStorage.setItem('darkMode', 'off');
  };

  // Function to toggle dark/light mode
  let toggleDarkMode = function () {
    if (BUTTON_DARK_MODE.classList.contains('active')) {
      setDarkMode();
    } else {
      setLightMode();
    }
  };

  // Check user preference from localStorage on page load
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'on') {
    setDarkMode();
  } else {
    setLightMode();
  }

  // Event listener for dark mode toggle button
  BUTTON_DARK_MODE.onclick = toggleDarkMode;
}
initializeDarkModeToggle();
