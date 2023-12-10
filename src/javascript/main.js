import {
  fetchMovies,
  apiKey,
  trendingMoviesEndpoint,
  searchMoviesEndpoint,
  imageBaseURL,
  movieDetailsEndpoint,
} from './api';
import { showFailureNotification } from './notification.js';

document.addEventListener('DOMContentLoaded', async () => {
  const searchForm = document.querySelector('.search-movie');
  const searchInput = searchForm.querySelector('input');
  const movieListContainer = document.getElementById('movieList');

  async function displayMovies(movies) {
    movieListContainer.innerHTML = '';

    if (movies.length === 0) {
      showFailureNotification('Movie not found!');
    } else {
      const movieUl = document.createElement('ul');

      for (const movie of movies) {
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
    }
  }

  async function performSearch(searchQuery) {
    if (searchQuery.trim() === '') {
      const trendingMoviesUrl = `${trendingMoviesEndpoint}?api_key=${apiKey}`;
      const trendingMovies = await fetchMovies(trendingMoviesUrl);
      displayMovies(trendingMovies.results);
    } else {
      const apiUrl = `${searchMoviesEndpoint}?api_key=${apiKey}&query=${searchQuery}`;
      const searchResults = await fetchMovies(apiUrl);
      displayMovies(searchResults.results);
    }
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    performSearch(searchQuery);
  });

  searchInput.addEventListener('input', function (event) {
    const searchQuery = searchInput.value.trim();
    performSearch(searchQuery);
  });

  const trendingMoviesUrl = `${trendingMoviesEndpoint}?api_key=${apiKey}`;
  const trendingMovies = await fetchMovies(trendingMoviesUrl);
  displayMovies(trendingMovies.results);
});



// import {
//   fetchMovies,
//   apiKey,
//   trendingMoviesEndpoint,
//   searchMoviesEndpoint,
//   imageBaseURL,
//   movieDetailsEndpoint,
// } from './api';
// import { showFailureNotification } from './notification2';

// document.addEventListener('DOMContentLoaded', async () => {
//   const searchForm = document.querySelector('.search-movie');
//   const searchInput = searchForm.querySelector('input');
//   const movieListContainer = document.getElementById('movieList');
//   const paginationContainer = document.getElementById('pagination');
//   const moviesPerPage = 9; // You can change this number based on your preference

//   let currentPage = 1;
  

//   async function displayMovies(movies) {
//     movieListContainer.innerHTML = '';

//     if (movies.length === 0) {
//       showFailureNotification('Movie not found!');
//     } else {
//       const startIndex = (currentPage - 1) * moviesPerPage;
//       const endIndex = startIndex + moviesPerPage;
//       const paginatedMovies = movies.slice(startIndex, endIndex);

//       const movieUl = document.createElement('ul');

//       for (const movie of paginatedMovies) {
//         if (movie.poster_path !== null) {
//           const cardLi = document.createElement('li');
//           const image = document.createElement('img');
//           const title = document.createElement('h2');
//           const genre = document.createElement('span1');
//           const voteAverage = document.createElement('span2');
//           const airDate = document.createElement('span3');

//           const detailsUrl = `${movieDetailsEndpoint}/${movie.id}?api_key=${apiKey}`;
//           const details = await fetchMovies(detailsUrl);

//           image.src = `${imageBaseURL}${movie.poster_path}`;
//           image.alt = `${movie.title} Poster`;
//           title.textContent = movie.title;
//           genre.textContent = `${details.genres
//             .map(genre => genre.name)
//             .join(', ')}`;

//           airDate.textContent = `${details.release_date}`;
//           const releaseYear = new Date(details.release_date).getFullYear();
//           airDate.textContent = `| ${releaseYear}`;

//           voteAverage.textContent = `${movie.vote_average}`;

//           cardLi.appendChild(image);
//           cardLi.appendChild(title);
//           cardLi.appendChild(genre);
//           cardLi.appendChild(airDate);
//           cardLi.appendChild(voteAverage);
//           movieUl.appendChild(cardLi);
//         }
//       }

//       movieListContainer.appendChild(movieUl);
//       renderPagination(movies.length);
//     }
//   }

//   function renderPagination(totalMovies) {
//     const totalPages = Math.ceil(totalMovies / moviesPerPage);
//     paginationContainer.innerHTML = '';

//     for (let i = 1; i <= totalPages; i++) {
//       const pageButton = document.createElement('button');
//       pageButton.textContent = i;
//       pageButton.addEventListener('click', () => {
//         currentPage = i;
//         const searchQuery = searchInput.value.trim();
//         performSearch(searchQuery);
//       });
//       paginationContainer.appendChild(pageButton);
//     }
//   }

//   async function performSearch(searchQuery) {
//     if (searchQuery.trim() === '') {
//       const trendingMoviesUrl = `${trendingMoviesEndpoint}?api_key=${apiKey}`;
//       const trendingMovies = await fetchMovies(trendingMoviesUrl);
//       displayMovies(trendingMovies.results);
//     } else {
//       const apiUrl = `${searchMoviesEndpoint}?api_key=${apiKey}&query=${searchQuery}`;
//       const searchResults = await fetchMovies(apiUrl);
//       displayMovies(searchResults.results);
//     }
//   }

//   searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     currentPage = 1; // Reset to the first page when performing a new search
//     const searchQuery = searchInput.value.trim();
//     performSearch(searchQuery);
//   });

//   searchInput.addEventListener('input', function (event) {
//     currentPage = 1; // Reset to the first page when input changes
//     const searchQuery = searchInput.value.trim();
//     performSearch(searchQuery);
//   });

//   const trendingMoviesUrl = `${trendingMoviesEndpoint}?api_key=${apiKey}`;
//   const trendingMovies = await fetchMovies(trendingMoviesUrl);
//   displayMovies(trendingMovies.results);
// });