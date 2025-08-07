import axiosInstance from "./axiosInstance";



export const searchMovie = async (keyword: string) => {

  try {
    const response = await axiosInstance.get(
      `/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
    );
    // console.log(response)
  
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching ${keyword}:`, error);
    return [];
  }
};
