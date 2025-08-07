import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Review } from '../types/ReviewTypes';

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

