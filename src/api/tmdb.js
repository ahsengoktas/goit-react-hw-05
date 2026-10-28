import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common.Authorization = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day');
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await axios.get('/search/movie', {
    params: { query, include_adult: false },
  });
  return data.results;
};

export const getMovieDetails = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

export const getMovieCast = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const getMovieReviews = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data.results;
};
