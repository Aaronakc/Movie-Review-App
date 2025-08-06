import axios from 'axios';
import { TMDB_API_TOKEN } from './token';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
          Accept: 'application/json',
  },
});

export default axiosInstance;