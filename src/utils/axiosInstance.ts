import axios from 'axios';
import { TMDB_API_TOKEN } from './token';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
          Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


axiosInstance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default axiosInstance;