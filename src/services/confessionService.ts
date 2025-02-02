import { db } from '../config/firebase';
import { collection, addDoc, updateDoc, doc, increment, arrayUnion } from 'firebase/firestore';

const confessionsCollection = collection(db, 'confessions');

export const confessionServices = {
  async createConfession(content: string, tags: string[], userId: string) {
    await addDoc(confessionsCollection, {
      content,
      tags,
      upvotes: 0,
      downvotes: 0,
      isFlagged: false,
      createdAt: new Date(),
      userId
    });
  },

  async voteConfession(confessionId: string, userId: string, isUpvote: boolean) {
    const confessionRef = doc(db, 'confessions', confessionId);
    await updateDoc(confessionRef, {
      [isUpvote ? 'upvotes' : 'downvotes']: increment(1),
      [`${isUpvote ? 'likedBy' : 'dislikedBy'}`]: arrayUnion(userId)
    });
  },

  async flagConfession(confessionId: string) {
    const confessionRef = doc(db, 'confessions', confessionId);
    await updateDoc(confessionRef, { isFlagged: true });
  }
};
