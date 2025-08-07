import axiosInstance from "./axiosInstance";
import { ACCOUNT_ID } from "./token";


export const fetchMovies = async (endpoint: string | undefined) => {
  let url = `movie/${endpoint}?language=en-US&page=1`

  if(endpoint == "trending") {
    url = `/trending/all/week?language=en-US`
  }
  else if(endpoint=="favorite"){
    url=`account/${ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`
  }
  else if(endpoint=='watchlist'){
    url=`/account/${ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`
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
