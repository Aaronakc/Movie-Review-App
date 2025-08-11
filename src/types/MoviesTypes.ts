export interface Movies{
  id:string;
  title:string;
  poster_path:string;
};
export interface MovieDetail{
  id:string;
  title:string;
  poster_path:string;
  backdrop_path:string;
  overview:string;
  original_title:string;
  status:string;
  original_language:string;
  popularity:string;
};

export interface MoviesPayload {
  now_playing?: MovieDetail[];
  popular?: MovieDetail[];
  top_rated?: MovieDetail[];
  upcoming?: MovieDetail[];
  trending?:MovieDetail[];
  watchlist?:MovieDetail[];
  favorite?:MovieDetail[];
}

export type Endpoint = 'now_playing' | 'popular' | 'top_rated' | 'upcoming' | 'trending'|'watchlist' |'favorite'
