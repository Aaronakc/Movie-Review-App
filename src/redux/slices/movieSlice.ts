import { createSlice } from '@reduxjs/toolkit'
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
  totalPages: {
    now_playing?: number,
    popular?: number,
    top_rated?: number,
    upcoming?: number,
    trending?: number,
    favorite?: number,
    watchlist?: number,
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
  totalPages:{},
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
        state.movies[firstKey]=[...state.movies[firstKey],...action.payload[firstKey]]
        state.totalPages[firstKey] = action.payload.totalPages || 1 
        state.loading=false
        state.error=null
      }
    })
    .addCase(getMovies.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(getMovies.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error fetching movies'
    })

  },
})

export const { } = movieSlice.actions


export default movieSlice.reducer