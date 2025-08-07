import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Home: undefined;
  MovieDetailScreen:{id:string};
};


export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;


export type NonAuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type BottomTabParamList = {
  BottomHome: undefined;   
  Search:undefined;  
  Wishlist: undefined; 
  Profile: undefined;  
};

  export type HomeTabScreenProps<T extends keyof BottomTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParamList, T>,
    AuthStackScreenProps<keyof AuthStackParamList>
  >;

