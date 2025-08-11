import axios from 'axios';
import { TMDB_API_TOKEN } from './token';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

axiosInstance.interceptors.request.use(function (config) {
     if(TMDB_API_TOKEN){
      config.headers.Authorization=`Bearer ${TMDB_API_TOKEN}`
      config.headers.Accept='application/json'
     }
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