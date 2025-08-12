import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice'
import  wishlistReducer from './slices/wishlistSlice'
import  reviewmovieReducer  from './slices/reviewSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    wishlist:wishlistReducer,
    review:reviewmovieReducer,
    
  },
  
  
  
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch