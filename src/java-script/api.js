// Assuming you have axios and fetchMovies function defined

const apiKey = "1d5cb9487b50db9f810f217d59251cf8";
const moviesContainer = document.querySelector('.movies-container');
const searchForm = document.querySelector('.search-movie');
const searchInput = searchForm.querySelector('input');

// Function to display movies in the container
const displayMovies = (movies) => {
  moviesContainer.innerHTML = ""; // Clear previous content

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    // Customize the display as per your requirement
    movieElement.innerHTML = `<p>${movie.title}</p>`;
    moviesContainer.appendChild(movieElement);
  });
};

// Function to fetch movies based on search query
const fetchMovies = async (query) => {
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  try {
    const response = await axios.get(apiUrl);
    const movies = response.data.results;
    displayMovies(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Event listener for form submission
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();
  if (searchQuery !== "") {
    fetchMovies(searchQuery);
  }
});
