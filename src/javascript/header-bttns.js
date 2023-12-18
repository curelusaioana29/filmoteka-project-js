// script.js

export function handleButtonClicks() {
  // Get references to the elements
  const libraryButton = document.querySelector('.library');
  const homeButton = document.querySelector('.home');
  const formDiv = document.querySelector('.form');
  const userListDiv = document.querySelector('.user-list');

  // Add click event listener to the library button
  libraryButton.addEventListener('click', function () {
    // Toggle classes for form and user-list
    formDiv.classList.add('hidden');
    userListDiv.classList.remove('hidden');
  });

  // Add click event listener to the home button
  homeButton.addEventListener('click', function () {
    // Toggle classes for form and user-list
    formDiv.classList.remove('hidden');
    userListDiv.classList.add('hidden');
  });
}
handleButtonClicks();
