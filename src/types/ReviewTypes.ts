export interface Review {
  id:string;
  username:string;
  movieId: string;
  userId: string;
  comment: string;
  createdAt?:any;
}
