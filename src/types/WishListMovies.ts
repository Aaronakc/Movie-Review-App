export interface WishListMoviesFromApi{
  movieId:string;
  poster_path:string;
}
export interface WishListMoviesFireStore{
  movieId:string;
  imgLink:string;
}

export interface AddWishPayload{
  movieId: string;
  img_path: string;
}