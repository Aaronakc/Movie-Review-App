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

    .addCase(addWishList.fulfilled,(state,action)=>{
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
    .addCase(deleteWishList.fulfilled,(state,action)=>{{}
      if(action.payload){
        const movieId=action.payload
        state.wishlistmovies=state.wishlistmovies.filter(wishlist=>wishlist.movieId != movieId)

      }

    })

   
  },
})

export const { } = wishlistmovieSlice.actions


export default wishlistmovieSlice.reducer