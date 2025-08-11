import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchMovies } from "../utils/fetchApi"
import { MoviesPayload } from "../types/MoviesTypes"
import { AddWishPayload, WishListMoviesFireStore } from "../types/WishListMovies"
import { addToWish, getAllWishLists } from "../utils/firestoreDatabase"



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

export const addWishList=createAsyncThunk<boolean,AddWishPayload>(
  'movie/addWishlist',
    async({movieId,img_path})=>{
        const response=await addToWish(movieId,img_path)
        if(response){
          return true
        }
        return false
    }
)

