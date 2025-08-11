import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './slices/movieSlice'
import  wishlistReducer from './slices/wishlistSlice'

export const store = configureStore({
  reducer: {
    movie:movieReducer,
    wishlist:wishlistReducer,
    
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch