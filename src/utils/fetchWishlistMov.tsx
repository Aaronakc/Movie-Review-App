import axiosInstance from "./axiosInstance";
import { ACCOUNT_ID } from "./token";



export const fetchWishlistMovies = async () => {

  try {
    const response = await axiosInstance.get(
      `/account/${ACCOUNT_ID}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
    );


    return response.data.results;
  } catch (error) {
    console.error('Error fetching from wishlist:', error);
    return [];
  }
};
