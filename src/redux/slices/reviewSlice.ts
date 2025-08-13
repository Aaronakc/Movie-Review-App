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
    .addCase(getReviews.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(getReviews.fulfilled, (state, action) => {
      state.loading=false
      state.reviewmovies=action.payload
      state.error=null
    })

    .addCase(getReviews.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error fetching review'
    })

    .addCase(addToReview.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(addToReview.fulfilled,(state,action)=>{
      state.loading=false
     if (action.payload != false) {
      const {id, movieId, username, userId, comment} = action.payload
      state.reviewmovies.push({id, movieId, username, userId, comment})
      }
      state.error=null
    })

   .addCase(addToReview.rejected,(state,action)=>{
      state.loading=false
      state.error=action.error.message ||'error adding review'
    })

    .addCase(editReview.pending,(state)=>{
      state.loading=true
      state.error=null
    })

    .addCase(editReview.fulfilled,(state,action)=>{
      state.loading=false
      if(action.payload){
        const {reviewId,newComment}=action.payload
        const review=state.reviewmovies.find(review=>review.id == reviewId)
        if(review){
          review.comment=newComment
        }
      }
      state.error=null
    })
    

     .addCase(editReview.rejected, (state,action) => {
        state.loading=false
        state.error = action.error.message || 'error editing review'
    })

    .addCase(deleteFromReview.pending,(state)=>{
      state.loading=true
      state.error=null
    })
    
    .addCase(deleteFromReview.fulfilled, (state, action) => {
      state.loading=false
      if (action.payload) {
       state.reviewmovies = state.reviewmovies.filter(review => review.id !== action.payload)
        }
      state.error=null
    })


    .addCase(deleteFromReview.rejected, (state,action) => {
        state.loading=false
        state.error = action.error.message || 'error deleting review'
    })
   
  },
})

export const {} = reviewmovieSlice.actions


export default reviewmovieSlice.reducer