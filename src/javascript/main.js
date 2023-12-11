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
  const btn1Ref = document.querySelector('[data-index="1"]');
const btn2Ref = document.querySelector('[data-index="2"]');
const btn3Ref = document.querySelector('[data-index="3"]');
const btn4Ref = document.querySelector('[data-index="4"]');
const btn5Ref = document.querySelector('[data-index="5"]');
const firstPageRef = document.querySelector('.first-button');
const lastPageRef = document.querySelector('.last-button');
const paginationRef = document.querySelector('.pagination-container');
const rightArrowRef = document.querySelector('.arrow-right');
const leftArrowRef = document.querySelector('.arrow-left');
const prevDotsRef = document.querySelector('#previous');
const afterDotsRef = document.querySelector('#after');




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

  paginationRef.addEventListener('click', onPaginationClick);

// let currentPage = 1;

let btns = document.querySelectorAll('.pagination-button');

prevDotsRef.hidden = true;
leftArrowRef.hidden = true;
firstPageRef.hidden = true;

function onPaginationClick(event) {
  if (event.target.tagName === 'BUTTON') {
    if (Number(event.target.textContent)) {
      currentPage = Number(event.target.textContent);
    }

    prevDotsRef.hidden = true;
    afterDotsRef.hidden = true;

    if (event.target.classList.contains('pagination-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      event.target.classList.add('pagination--current');
    }

    if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.classList.add('pagination--current');
      btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
      currentPage = btn1Ref.textContent;
    }

    if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
      btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
      btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
      btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
      btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
    }

    if (event.target.classList.contains('first-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = 1;
      btn2Ref.textContent = 2;
      btn3Ref.textContent = 3;
      btn4Ref.textContent = 4;
      btn5Ref.textContent = 5;
      btn1Ref.classList.add('pagination--current');
      currentPage = btn1Ref.textContent;
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (event.target.classList.contains('last-button')) {
      btns.forEach(el => el.classList.remove('pagination--current'));
      btn1Ref.textContent = Number(lastPageRef.textContent) - 4;
      btn2Ref.textContent = Number(lastPageRef.textContent) - 3;
      btn3Ref.textContent = Number(lastPageRef.textContent) - 2;
      btn4Ref.textContent = Number(lastPageRef.textContent) - 1;
      btn5Ref.textContent = lastPageRef.textContent;
      btn5Ref.classList.add('pagination--current');
      currentPage = btn5Ref.textContent;
      rightArrowRef.hidden = true;
      afterDotsRef.hidden = true;
      lastPageRef.hidden = true;
    }

    if (Number(currentPage) > 5) {
      leftArrowRef.hidden = false;
      prevDotsRef.hidden = false;
      firstPageRef.hidden = false;
    } else {
      leftArrowRef.hidden = true;
      prevDotsRef.hidden = true;
      firstPageRef.hidden = true;
    }

    if (Number(currentPage) < 996) {
      rightArrowRef.hidden = false;
      afterDotsRef.hidden = false;
      lastPageRef.hidden = false;
    }

    movieList.innerHTML = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (inputRef.value !== '') {
      movieSearcher(inputRef.value, currentPage);
    } else {
      startPage();
    }
  }
}

let pageSize = 9;

function defineResultsPerPage() {
  if (window.innerWidth >= 1024) {
    pageSize = 9;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    pageSize = 8;
  } else if (window.innerWidth < 768) {
    pageSize = 4;
  }
  return pageSize;
}

const secret = {
  r: 'goit',
  e: 'go it',
}

});



// import {
//   fetchMovies,
//   apiKey,
//   trendingMoviesEndpoint,
//   searchMoviesEndpoint,
//   imageBaseURL,
//   movieDetailsEndpoint,
// } from './api';
// import { showFailureNotification } from './notification';

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

  // movieList.innerHTML = '';
  // window.scrollTo({ top: 0, behavior: 'smooth' });

  // if (searchInput.value !== '') {
  //   movieSearcher(searchInput.value, currentPage);
  // } else {
  //   paginationContainer();
  // }
  
// });