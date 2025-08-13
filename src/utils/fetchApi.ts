import { MoviesPayload } from "../types/MoviesTypes";
import axiosInstance from "./axiosInstance";
import { ACCOUNT_ID } from "./token";


export const fetchMovies = async (endpoint: string,page:number=1) => {
  let url = `movie/${endpoint}?language=en-US&page=${page}`

  if(endpoint == "trending") {
    url = `/trending/all/week?language=en-US`
  }
  else if(endpoint=="favorite"){
    url=`account/${ACCOUNT_ID}/favorite/movies?language=en-US&page=${page}&sort_by=created_at.asc`
  }
  else if(endpoint=='watchlist'){
    url=`/account/${ACCOUNT_ID}/watchlist/movies?language=en-US&page=${page}&sort_by=created_at.asc`
  }


  try {
    const response = await axiosInstance.get(
      url
    );
    // console.log(response)

    // console.log(response.data.total_pages)
    return {
      [endpoint]: response.data.results ,
      totalPages: response.data.total_pages,
    } as MoviesPayload & {totalPages:number}
    
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return {
      [endpoint]:[],
      totalPages:0,
    }as MoviesPayload & {totalPages:number};
  }
};
