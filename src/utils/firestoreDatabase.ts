import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Review } from '../types/ReviewTypes';
import Toast from 'react-native-toast-message';

export const addReview = async (movieId: string, comment: string) => {
  const user = auth().currentUser;

  const userName=user?.email?.split('@')[0]

  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const reviewRef = await firestore().collection('reviews').add({
      username:userName,
      movieId,
      userId: user.uid,
      comment,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return reviewRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};


export const getAllReviews = async (movieId:string) => {
  try {
    const snapshot = await firestore().collection('reviews').where('movieId', '==', movieId).get();

    const reviews: Review[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Review, 'id'>),
    }));

    console.log('Fetched reviews:', reviews);
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const addToWish=async(movieId:string,img_path:string)=>{
  const user = auth().currentUser;
  
  if (!user) {
    throw new Error('User not logged in');
  }
  const uid=user.uid

  try{
    const wishListRef=await firestore().collection('users').doc(uid).collection('wishlist')
    const existing = await wishListRef.where('movieId', '==', movieId).get();
      if(!existing.empty){
        return false;
      }
      
      await firestore().collection('users').doc(uid).collection('wishlist').add({
      userId:uid,
      movieId,
      imgLink:`https://image.tmdb.org/t/p/w200${img_path}` ,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return true;

  }
  catch(error){
    console.error('Error adding review:', error);
    throw error;
  }
}


export const getAllWishLists = async () => {
   const user = auth().currentUser;
  
  if (!user) {
    throw new Error('User not logged in');
  }
  const uid=user.uid
  try {
    const snapshot = await firestore().collection('users').doc(uid).collection('wishlist').get()

    const wishlists = snapshot.docs.map(doc => ({
      movieId: doc.data().movieId,
      imgLink: doc.data().imgLink,
    }));

    console.log('Fetched wishlist:', wishlists);
    return wishlists;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
