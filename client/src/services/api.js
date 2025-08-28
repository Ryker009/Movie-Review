import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Keep this function to get all movies if you need it elsewhere
export const getMovies = () => API.get('/movies');

// ADD THESE NEW FUNCTIONS
export const getTrendingMovies = () => API.get('/movies/trending');
export const getHighestRatedMovies = () => API.get('/movies/highest-rating');
export const getFanFavouriteMovies = () => API.get('/movies/fan-favourite');
export const getMoviesByGenre = (genre) => API.get(`/movies/genre/${genre}`);
// END OF ADDED FUNCTIONS

export const getMovieDetails = (id) => API.get(`/movies/${id}`);

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

export const getComments = (movieId) => API.get(`/movies/${movieId}/comments`);
export const postComment = (movieId, commentData) => {
  const token = localStorage.getItem('token');
  return API.post(`/movies/${movieId}/comments`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};