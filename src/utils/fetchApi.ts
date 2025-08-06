import axios from "axios";
import Config from "react-native-config";

export const fetchMovies = async (endpoint: string) => {

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${Config.TMDB_API_TOKEN}`,
          Accept: 'application/json',
        },
      }
    );
  
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
};
