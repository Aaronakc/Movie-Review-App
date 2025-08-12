import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchMovies } from "../utils/fetchApi"
import { MoviesPayload } from "../types/MoviesTypes"
import { AddWishPayload, WishListMoviesFireStore } from "../types/WishListMovies"
import { addToWish, getAllReviews, getAllWishLists,addReview, deleteReview, updateReview, deleteWishListByMovieId } from "../utils/firestoreDatabase"
import { AddReviewPayload, Review, UpdateReviewPayload } from "../types/ReviewTypes"



export const getMovies = createAsyncThunk<MoviesPayload,string>(
  'movie/getMovies',
    async (endpoint: string) => {
    const response = await fetchMovies(endpoint)
    return response
  },
)

export const fetchWishListMovies=createAsyncThunk<WishListMoviesFireStore[]>(
  'movie/getWishlist',
    async()=>{
        const response=await getAllWishLists()
        return response
    }

)

export const addWishList=createAsyncThunk<AddWishPayload | null,AddWishPayload>(
  'movie/addWishlist',
    async({movieId,img_path})=>{
        const response=await addToWish(movieId,img_path)
        if(response){
          return {movieId, img_path}
        }
        return null
    }
)

export const deleteWishList = createAsyncThunk<string | false, string>(
  'wishlist/deleteWishList',
  async (movieId) => {
    const result = await deleteWishListByMovieId(movieId);
    return result ? movieId : false;
  }
);


export const getReviews=createAsyncThunk<Review[],string>(
  'movie/getReview',
    async(movieId:string)=>{
        const response=await getAllReviews(movieId)
        return response
    }

)
export const addToReview=createAsyncThunk<Review | false,AddReviewPayload>(
  'movie/addReview',
    async({movieId,comment})=>{
        const response=await addReview(movieId,comment)
     return response || false
    }

)

export const deleteFromReview = createAsyncThunk<string | false, string>(
  'movie/deleteReview',
  async (reviewId) => {
    const result = await deleteReview(reviewId);
    return result ? reviewId : false
  }
)

export const editReview = createAsyncThunk<UpdateReviewPayload | null,UpdateReviewPayload >(
  "movie/editReview",
  async ({ reviewId, newComment }) => {
    const response = await updateReview(reviewId, newComment)
    if(response){
      return {reviewId,newComment}
    }
    return null
  }
)