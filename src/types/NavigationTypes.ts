import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Endpoint } from "./MoviesTypes";

export type RootStackParamList = {
  Home: undefined;
  MovieDetailScreen:{endpoint?:Endpoint,id:string};
  Login: undefined;
  Signup: undefined;
  MovieReviewScreen:{id:string};
};


export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;


export type BottomTabParamList = {
  BottomHome: undefined;   
  Search:undefined;  
  Wishlist: undefined; 
  Profile: undefined;  
};

  export type HomeTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

