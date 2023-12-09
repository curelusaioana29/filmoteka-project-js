const apiKey = '1d5cb9487b50db9f810f217d59251cf8'; // Replace with your TMDb API key
const trendingMoviesEndpoint =
  'https://api.themoviedb.org/3/trending/movie/week';
const searchMoviesEndpoint = 'https://api.themoviedb.org/3/search/movie';
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', async () => {
  const moviesContainer = document.querySelector('.movies-container');
  const searchForm = document.querySelector('.search-movie');
  const searchInput = searchForm.querySelector('input');
  const movieListContainer = document.getElementById('movieList');

  const displayMovies = movies => {
    movieListContainer.innerHTML = '';

    if (movies.length === 0) {
      Notiflix.Notify.failure('Movie not found!');
    } else {
      movies.forEach(movie => {
        if (movie.poster_path !== null) {
          const movieDiv = document.createElement('div');
          const image = document.createElement('img');
          const title = document.createElement('h2');
          const overview = document.createElement('p');
          const voteAverage = document.createElement('span');

          image.src = `${imageBaseURL}${movie.poster_path}`;
          image.alt = `${movie.title} Poster`;
          title.textContent = movie.title;
          overview.textContent = movie.overview;
          voteAverage.textContent = movie.vote_average;

          movieDiv.appendChild(image);
          movieDiv.appendChild(title);
          movieDiv.appendChild(overview);
          movieDiv.appendChild(voteAverage);

          movieListContainer.appendChild(movieDiv);
        }
      });
    }
  };

  const fetchMovies = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const performSearch = async searchQuery => {
    if (searchQuery.trim() === '') {
      const trendingMoviesUrl = `${trendingMoviesEndpoint}?api_key=${apiKey}`;
      const trendingMovies = await fetchMovies(trendingMoviesUrl);
      displayMovies(trendingMovies);
    } else {
      const apiUrl = `${searchMoviesEndpoint}?api_key=${apiKey}&query=${searchQuery}`;
      const searchResults = await fetchMovies(apiUrl);
      displayMovies(searchResults);
    }
  };

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
  displayMovies(trendingMovies);
});
