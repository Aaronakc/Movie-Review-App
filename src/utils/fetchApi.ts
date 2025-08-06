import axios from "axios";
import axiosInstance from "./axiosInstance";


export const fetchMovies = async (endpoint: string | undefined) => {
  let url = `movie/${endpoint}?language=en-US&page=1`

  if(endpoint == "trending") {
    url = `/trending/all/week?language=en-US`
  }

  try {
    const response = await axiosInstance.get(
      url
    );
  
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};
