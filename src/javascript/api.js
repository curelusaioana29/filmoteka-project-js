// api.js
export const apiKey = '1d5cb9487b50db9f810f217d59251cf8';
export const trendingMoviesEndpoint = 'https://api.themoviedb.org/3/trending/movie/week';
export const searchMoviesEndpoint = 'https://api.themoviedb.org/3/search/movie';
export const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
export const movieDetailsEndpoint = 'https://api.themoviedb.org/3/movie';

export async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {};
  }
}
