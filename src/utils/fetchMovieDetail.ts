import axiosInstance from "./axiosInstance";


export const fetchMovieDetail = async (movie_id: string) => {

  try {
    const response = await axiosInstance.get(
      `/movie/${movie_id}?language=en-US`,
    );
    console.log(response)
  
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${movie_id}:`, error);
    return [];
  }
};
