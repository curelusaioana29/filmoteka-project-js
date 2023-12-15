/** Load Movies From ApiKey
 * Search Movie From ApiKey
 * Movie Servicies
 * Pagination
 */
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
  let currentPageButton;

  const movieModal = document.getElementById('movieModal');
  const closeMovieModalBtn = document.getElementById('closeMovieModal');

  closeMovieModalBtn.addEventListener('click', () => {
    movieModal.style.display = 'none';
  });

  

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
            .slice(0, 3) // Take the first three genres
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
          // Add click event on movie card to display details in modal
          cardLi.addEventListener('click', async () => {
            displayMovieDetails(details);
          });

          movieUl.appendChild(cardLi);
        }
      }

      movieListContainer.appendChild(movieUl);
      renderPagination(movies.length);
    }
  }

  async function displayMovieDetails(details) {
    const modalDetails = document.getElementById('modalDetails');
    modalDetails.innerHTML = '';
    const detailsContainer = document.createElement('div');
    detailsContainer.style.display = 'flex';
    const leftSection = document.createElement('div');
    leftSection.style.marginRight = '20px'; 
    const posterImage = document.createElement('img');
    posterImage.src = `${imageBaseURL}${details.poster_path}`;
    posterImage.alt = `${details.title} Poster`;
    posterImage.style.width = '100%'; 
    posterImage.style.height = '100%'; 
    posterImage.style.objectFit = 'cover'; 
    leftSection.appendChild(posterImage);
    leftSection.appendChild(posterImage);
    const rightSection = document.createElement('div');
    const titleElement = document.createElement('h2');
    titleElement.textContent = details.title;
    rightSection.appendChild(titleElement);
    const overviewElement = document.createElement('p');
    overviewElement.textContent = details.overview;
    rightSection.appendChild(overviewElement);
    const voteAverageElement = document.createElement('p');
    const voteAverageText = document.createElement('span');
    voteAverageText.innerHTML = details.vote_average;
    voteAverageElement.innerHTML = `<strong>Vote Average:</strong> `;
    voteAverageElement.appendChild(voteAverageText);
    voteAverageText.classList.add('vote-average-text');
    rightSection.appendChild(voteAverageElement);
    const releaseDateElement = document.createElement('p');
    releaseDateElement.innerHTML = `<strong>Release Date:</strong> ${details.release_date}`;
    rightSection.appendChild(releaseDateElement);
    const genresElement = document.createElement('p');
    const genresText = details.genres.map(genre => genre.name).join('<span class="slash"> | </span>');
    genresElement.innerHTML = `<strong>Genres:</strong> ${genresText}`;
    rightSection.appendChild(genresElement);
    const runtimeElement = document.createElement('p');
    runtimeElement.innerHTML = `<strong>Runtime:</strong> ${details.runtime} minutes`;
    rightSection.appendChild(runtimeElement);
    const taglineElement = document.createElement('p');
    taglineElement.innerHTML = `<strong>Tagline:</strong> ${details.tagline || 'Not available'}`;
    rightSection.appendChild(taglineElement);
  
    detailsContainer.appendChild(leftSection);
    detailsContainer.appendChild(rightSection);
    modalDetails.appendChild(detailsContainer);
  
    movieModal.style.display = 'block';
  }

  function renderPagination(totalMovies) {
    const totalPages = Math.ceil(totalMovies / moviesPerPage);
    paginationContainer.innerHTML = '';

    const visiblePages = 5; 
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
      const firstButton = createPaginationButton('1');
      paginationContainer.appendChild(firstButton);

      if (startPage > 2) {
        const ellipsis1 = document.createElement('span');
        ellipsis1.textContent = '...';
        paginationContainer.appendChild(ellipsis1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageButton = createPaginationButton(i.toString());
      paginationContainer.appendChild(pageButton);

      if (i === currentPage) {
        currentPageButton = pageButton;
        currentPageButton.classList.add('active');
      }
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsis2 = document.createElement('span');
        ellipsis2.textContent = '...';
        paginationContainer.appendChild(ellipsis2);
      }

      const lastButton = createPaginationButton(totalPages.toString());
      paginationContainer.appendChild(lastButton);
    }
  }

  function createPaginationButton(pageNumber) {
    const pageButton = document.createElement('button');
    pageButton.textContent = pageNumber;
    pageButton.addEventListener('click', () => performSearch(searchInput.value.trim(), parseInt(pageNumber)));
    return pageButton;
  }

  async function performSearch(searchQuery, page = 1) {
    currentPage = page;
    const totalMovies = 900; 
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


      if (movies.length >= totalMovies) {
        break;
      }
    }

    displayMovies(movies);


    if (currentPageButton) {
      currentPageButton.classList.remove('active');
    }

    renderPagination(movies.length);
  }

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    performSearch(searchInput.value.trim());
  });

  let searchTimeout;
  const debounceDelay = 0;

  async function performSearch(searchQuery, page = 1) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      currentPage = page;
      const totalMovies = 900; 
      const totalPages = Math.ceil(totalMovies / moviesPerPage);

      const movies = [];
      const fetchPromises = [];

      for (let p = 1; p <= totalPages; p++) {
        const url = searchQuery.trim() === ''
          ? `${trendingMoviesEndpoint}?api_key=${apiKey}&page=${p}`
          : `${searchMoviesEndpoint}?api_key=${apiKey}&query=${searchQuery}&page=${p}`;

        fetchPromises.push(fetchMovies(url));
      }

      const results = await Promise.all(fetchPromises);

      results.forEach(result => {
        if (result.results) {
          movies.push(...result.results);
        }
      });

      displayMovies(movies);


      if (currentPageButton) {
        currentPageButton.classList.remove('active');
      }

      renderPagination(movies.length);
    }, debounceDelay);
  }


  await performSearch('', currentPage);
});
