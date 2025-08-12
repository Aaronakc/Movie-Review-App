export interface Review {
  id:string;
  username?:string;
  movieId: string;
  userId: string;
  comment: string;
}

export interface AddReviewPayload{
  movieId: string;
  comment:string;
}

export interface UpdateReviewPayload {
  reviewId: string;
  newComment: string;
}