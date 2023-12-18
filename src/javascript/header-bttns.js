export function handleButtonClicks() {
  const libraryButton = document.querySelector('.library');
  const homeButton = document.querySelector('.home');
  const formDiv = document.querySelector('.form');
  const userListDiv = document.querySelector('.user-list');
  const movieListDiv = document.querySelector('#movieList');
  const paginationDiv = document.querySelector('#pagination');

  libraryButton.addEventListener('click', function () {
    formDiv.classList.add('hidden');
    userListDiv.classList.remove('hidden');
    movieListDiv.classList.add('hidden');
    paginationDiv.classList.add('hidden');
  });

  homeButton.addEventListener('click', function () {
    formDiv.classList.remove('hidden');
    userListDiv.classList.add('hidden');
    movieListDiv.classList.remove('hidden');
    paginationDiv.classList.remove('hidden');
  });
}

handleButtonClicks();
