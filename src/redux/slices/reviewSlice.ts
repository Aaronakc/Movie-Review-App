import { createSlice } from '@reduxjs/toolkit'
import { addToReview, deleteFromReview, editReview, getReviews } from '../asyncActions';
import { Review } from '../../types/ReviewTypes';


interface reviewState {
  reviewmovies:Review[],
  loading:boolean;
  error:string | null;
   
}

const initialState: reviewState = {
  reviewmovies:[] ,
  loading:false,
  error:null,
}

export const reviewmovieSlice = createSlice({
  name: 'reviewmovie',
  initialState,
  reducers: {

   
  },
    extraReducers: (builder) => {
    builder
    .addCase(getReviews.fulfilled, (state, action) => {
      state.loading=false
      state.reviewmovies=action.payload
    })

    .addCase(getReviews.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(getReviews.rejected,(state)=>{
      state.loading=false
      state.error='error fetching review'
    })

    .addCase(addToReview.fulfilled,(state,action)=>{
     if (action.payload != false) {
      const {id, movieId, username, userId, comment} = action.payload
      state.reviewmovies.push({id, movieId, username, userId, comment})
      }
    })

   .addCase(addToReview.rejected,(state)=>{
      state.loading=false
      state.error='error adding review'
    })

    .addCase(editReview.fulfilled,(state,action)=>{
      if(action.payload){
        const {reviewId,newComment}=action.payload
        const review=state.reviewmovies.find(review=>review.id == reviewId)
        if(review){
          review.comment=newComment
        }
      }
    })
    

     .addCase(editReview.rejected, (state) => {
        state.error = 'error editing review'
    })
    
    .addCase(deleteFromReview.fulfilled, (state, action) => {
      if (action.payload) {
       state.reviewmovies = state.reviewmovies.filter(review => review.id !== action.payload)
        }
    })


    .addCase(deleteFromReview.rejected, (state) => {
        state.error = 'error deleting review'
    })
   
  },
})

export const {} = reviewmovieSlice.actions


export default reviewmovieSlice.reducer