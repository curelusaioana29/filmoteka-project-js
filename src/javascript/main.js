import {
  fetchMovies,
  apiKey,
  trendingMoviesEndpoint,
  searchMoviesEndpoint,
  imageBaseURL,
  movieDetailsEndpoint,
} from './api';

import { showFailureNotification } from './notification';

document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.querySelector('.search-movie');
  const searchInput = searchForm.querySelector('input');
  const movieListContainer = document.getElementById('movieList');
  const paginationContainer = document.getElementById('pagination');
  const moviesPerPage = 9;

  let currentPage = 1;

  async function displayMovies(movies) {
    movieListContainer.innerHTML = '';

    if (movies.length === 0) {
      showFailureNotification('Movie not found!');
    } else {
      const startIndex = (currentPage - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;
      const paginatedMovies = movies.slice(startIndex, endIndex);

      const movieUl = document.createElement('ul');

      for (const movie of paginatedMovies) {
        if (movie.poster_path !== null) {
          const cardLi = document.createElement('li');
          const image = document.createElement('img');
          const title = document.createElement('h2');
          const genre = document.createElement('span1');
          const voteAverage = document.createElement('span2');
          const airDate = document.createElement('span3');

          const detailsUrl = `${movieDetailsEndpoint}/${movie.id}?api_key=${apiKey}`;
          const details = await fetchMovies(detailsUrl);

          image.src = `${imageBaseURL}${movie.poster_path}`;
          image.alt = `${movie.title} Poster`;
          title.textContent = movie.title;
          genre.textContent = `${details.genres
            .map(genre => genre.name)
            .join(', ')}`;

          airDate.textContent = `${details.release_date}`;
          const releaseYear = new Date(details.release_date).getFullYear();
          airDate.textContent = `| ${releaseYear}`;

          voteAverage.textContent = `${movie.vote_average}`;

          cardLi.appendChild(image);
          cardLi.appendChild(title);
          cardLi.appendChild(genre);
          cardLi.appendChild(airDate);
          cardLi.appendChild(voteAverage);
          movieUl.appendChild(cardLi);
        }
      }

      movieListContainer.appendChild(movieUl);
      renderPagination(movies.length);
    }
  }

  function renderPagination(totalMovies) {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    paginationContainer.innerHTML = '';

    const visiblePages = 7; // Adjust this number based on your preference
    const sideButtons = Math.floor(visiblePages / 2);

    let startPage = currentPage - sideButtons;
    let endPage = currentPage + sideButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(visiblePages, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - visiblePages + 1);
    }

    if (startPage > 1) {
      const firstButton = document.createElement('button');
      firstButton.textContent = '1';
      firstButton.addEventListener('click', () => performSearch(searchInput.value.trim(), 1));
      paginationContainer.appendChild(firstButton);

      if (startPage > 2) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.textContent = '...';
        paginationContainer.appendChild(ellipsis1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.addEventListener('click', () => performSearch(searchInput.value.trim(), i));
      paginationContainer.appendChild(pageButton);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.textContent = '...';
        paginationContainer.appendChild(ellipsis2);
      }

      const lastButton = document.createElement('button');
      lastButton.textContent = totalPages;
      lastButton.addEventListener('click', () => performSearch(searchInput.value.trim(), totalPages));
      paginationContainer.appendChild(lastButton);
    }
  }

  async function performSearch(searchQuery, page = 1) {
    currentPage = page;
    const totalMovies = 900; // Set the total number of movies you want to display
    const moviesPerPage = 9;
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    const movies = [];

    for (let page = 1; page <= totalPages; page++) {
      const url = searchQuery.trim() === ''
        ? `${trendingMoviesEndpoint}?api_key=${apiKey}&page=${page}`
        : `${searchMoviesEndpoint}?api_key=${apiKey}&query=${searchQuery}&page=${page}`;

      const results = await fetchMovies(url);

      if (results.results) {
        movies.push(...results.results);
      }

      // If you already have enough movies, break out of the loop
      if (movies.length >= totalMovies) {
        break;
      }
    }

    displayMovies(movies);
    renderPagination(movies.length);
  }

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(searchInput.value.trim());
  });

  searchInput.addEventListener('input', () => performSearch(searchInput.value.trim()));

  await performSearch('', currentPage);
});
