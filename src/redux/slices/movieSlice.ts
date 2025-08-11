import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MovieDetail } from '../../types/MoviesTypes'
import { getMovies } from '../asyncActions';


interface MovieState {
  movies:{
    now_playing:MovieDetail[],
    popular:MovieDetail[],
    top_rated:MovieDetail[],
    upcoming:MovieDetail[],
    trending:MovieDetail[],
    favorite:MovieDetail[],
    watchlist:MovieDetail[],

  };
  loading:boolean;
  error:string | null;
   
}

const initialState: MovieState = {
  movies: {
    now_playing:[],
    popular:[],
    top_rated:[],
    upcoming:[],
    trending:[],
    favorite:[],
    watchlist:[],
  },
  loading:false,
  error:null,
}

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
  
   
  },
    extraReducers: (builder) => {
    builder
    .addCase(getMovies.fulfilled, (state, action) => {
      const keys = Object.keys(action.payload); 
      const firstKey = keys[0] as keyof typeof state.movies; 
      if(action.payload[firstKey]){
        state.movies[firstKey]=action.payload[firstKey]
        state.loading=false
        state.error=null
      }
    })
    .addCase(getMovies.pending,(state)=>{
      state.loading=true
      state.error=null
    })
    .addCase(getMovies.rejected,(state)=>{
      state.loading=false
      state.error='error fetching movies'
    })

  },
})

export const { } = movieSlice.actions


export default movieSlice.reducer