const apiKey = "1d5cb9487b50db9f810f217d59251cf8";
const moviesContainer = document.querySelector('.movies-container');
const searchForm = document.querySelector('.search-movie');
const searchInput = searchForm.querySelector('input');

const displayMovies = (movies) => {
  moviesContainer.innerHTML = "";

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<p>${movie.title}</p>`;
    moviesContainer.appendChild(movieElement);
  });
};

const fetchMovies = async (query, page = 1) => {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;

  try {
    const response = await axios.get(apiUrl);
    const movies = response.data.results;
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  performSearch();
});

searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    performSearch();
  }
});

const performSearch = () => {
  const searchQuery = searchInput.value.trim();
  if (searchQuery !== "") {
    fetchMovies(searchQuery);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  await fetchMovies("", 1);
});
