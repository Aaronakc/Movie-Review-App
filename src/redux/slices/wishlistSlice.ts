import { createSlice } from '@reduxjs/toolkit'
import { addWishList, deleteWishList, fetchWishListMovies } from '../asyncActions';
import { WishListMoviesFireStore } from '../../types/WishListMovies';



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
  
  },
    extraReducers: (builder) => {
    builder
    .addCase(fetchWishListMovies.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(fetchWishListMovies.fulfilled, (state, action) => {
      state.loading=false
      state.wishlistmovies=action.payload
      state.error=null
      
    })
    
    .addCase(fetchWishListMovies.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error fetching wishlist movies'
    })

   .addCase(addWishList.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(addWishList.fulfilled,(state,action)=>{
      state.loading=false
      state.error=null
      // console.log(action.payload)
      if(action.payload) {
        const {movieId,img_path}=action.payload
        console.log(action.payload)
          const movieExists=state.wishlistmovies.find(movie=> movie.movieId == movieId)
    
          if(movieExists) {
            return;
          }
    
         state.wishlistmovies.push({movieId, imgLink:`https://image.tmdb.org/t/p/w200${img_path}`})
      }
     
    })

     .addCase(addWishList.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error adding wishlist'
    })

    .addCase(deleteWishList.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    
     .addCase(deleteWishList.fulfilled,(state,action)=>{
      state.loading=false
      state.error=null
      if(action.payload){
        const movieId=action.payload
        state.wishlistmovies=state.wishlistmovies.filter(wishlist=>wishlist.movieId != movieId)
      }
    })

    .addCase(deleteWishList.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error deleting wishlist'
    })

   
  },
})

export const { } = wishlistmovieSlice.actions


export default wishlistmovieSlice.reducer