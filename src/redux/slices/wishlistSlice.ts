import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MovieDetail } from '../../types/MoviesTypes'
import { fetchWishListMovies, getMovies } from '../asyncActions';
import { WishListMoviesFireStore } from '../../types/WishListMovies';
import auth from '@react-native-firebase/auth';


interface wishlistState {
  wishlistmovies:WishListMoviesFireStore[],
  loading:boolean;
  error:string | null;
   
}

const initialState: wishlistState = {
  wishlistmovies:[] ,
  loading:false,
  error:null,
}

export const wishlistmovieSlice = createSlice({
  name: 'wishlistmovie',
  initialState,
  reducers: {
    addWishToReducer:(state,action)=>{
        const {movieId,img_path}=action.payload
        const movieExists=state.wishlistmovies.find(movie=> movie.movieId == movieId)
  
        if(movieExists) {
          return;
        }
  
       state.wishlistmovies.push({movieId, imgLink:`https://image.tmdb.org/t/p/w200${img_path}`})
    }
  
   
  },
    extraReducers: (builder) => {
    builder
    .addCase(fetchWishListMovies.fulfilled, (state, action) => {
      state.loading=false
      state.wishlistmovies=action.payload
      state.error=null
      
    })
    .addCase(fetchWishListMovies.pending,(state)=>{
      state.loading=true
      state.error=null
    })
    .addCase(fetchWishListMovies.rejected,(state)=>{
      state.loading=false
      state.error='error fetching wishlist movies'
    })

  },
})

export const {addWishToReducer } = wishlistmovieSlice.actions


export default wishlistmovieSlice.reducer