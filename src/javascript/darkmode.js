export function applyDarkModeStyles() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    let darkModeStylesheet = document.createElement('link');
    darkModeStylesheet.rel = 'stylesheet';
    darkModeStylesheet.href = '/css/darkmode.css';

    document.head.appendChild(darkModeStylesheet);
  }
}
applyDarkModeStyles();
