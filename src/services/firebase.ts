import { db, storage } from '../config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  increment,
  runTransaction,
  onSnapshot,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { 
  UserProfile, 
  MarketplaceListing, 
  Event, 
  Confession,
  Message 
} from '../types';
import { confessionsCollection } from '../data/initializeFirestore';

// User Profile Services
export const userServices = {
  async createProfile(userId: string, profile: Partial<UserProfile>) {
    await setDoc(doc(db, 'users', userId), {
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async uploadProfilePhoto(userId: string, file: File) {
    const storageRef = ref(storage, `profile-photos/${userId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async getProfile(userId: string) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as UserProfile : null;
  }
};

// Marketplace Services
export const marketplaceServices = {
  async createListing(listing: Partial<MarketplaceListing>) {
    return addDoc(collection(db, 'listings'), {
      ...listing,
      createdAt: new Date(),
      status: 'Available'
    });
  },

  async uploadListingImage(listingId: string, file: File, index: number) {
    const storageRef = ref(storage, `listing-images/${listingId}/${index}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async getListings(category?: string) {
    const q = category && category !== 'All'
      ? query(
          collection(db, 'listings'),
          where('category', '==', category),
          where('status', '==', 'Available'),
          orderBy('createdAt', 'desc')
        )
      : query(
          collection(db, 'listings'),
          where('status', '==', 'Available'),
          orderBy('createdAt', 'desc')
        );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MarketplaceListing[];
  }
};

// Chat Services
export const chatServices = {
  async sendMessage(message: Partial<Message>) {
    return addDoc(collection(db, 'chats'), {
      ...message,
      timestamp: new Date()
    });
  },

  async getMessages(listingId: string, userId: string) {
    const q = query(
      collection(db, 'chats'),
      where('listingId', '==', listingId),
      where('participants', 'array-contains', userId),
      orderBy('timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  }
};

// Events Services
export const eventServices = {
  async createEvent(event: Partial<Event>) {
    return addDoc(collection(db, 'events'), {
      ...event,
      createdAt: new Date()
    });
  },

  async getEvents(category?: string) {
    const q = category && category !== 'All'
      ? query(
          collection(db, 'events'),
          where('category', '==', category),
          where('date', '>=', new Date()),
          orderBy('date', 'asc')
        )
      : query(
          collection(db, 'events'),
          where('date', '>=', new Date()),
          orderBy('date', 'asc')
        );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  }
};

// Confessions Services
export const confessionServices = {
  async createConfession(p0: string, selectedTags: string[], userId: string, confessionData: Partial<Confession>) {
    try {
      const docRef = await addDoc(collection(db, 'confessions'), {
        ...confessionData,
        upvotes: 0,
        downvotes: 0,
        reports: 0,
        isFlagged: false,
        createdAt: new Date(),
        userId, // Save userId in the confession document
        });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  },
  getRealTimeConfessions(callback: (snapshot: QuerySnapshot<DocumentData>) => void) {
    const q = query(
      collection(db, 'confessions'),
      orderBy('createdAt', 'desc')
    );
    
    return onSnapshot(q, callback);
  },

  async handleVote(confessionId: string, userId: string, isUpvote: boolean) {
    const voteDocRef = doc(db, 'votes', `${confessionId}_${userId}`);
    const confessionRef = doc(db, 'confessions', confessionId);

    return await runTransaction(db, async (transaction) => {
      const voteDoc = await transaction.get(voteDocRef);
      const confessionDoc = await transaction.get(confessionRef);

      if (voteDoc.exists()) {
        throw new Error('You already voted on this confession');
      }

      transaction.set(voteDocRef, {
        userId,
        confessionId,
        voteType: isUpvote ? 'up' : 'down',
        timestamp: new Date()
      });

      transaction.update(confessionRef, {
        upvotes: isUpvote ? increment(1) : confessionDoc.data()?.upvotes,
        downvotes: !isUpvote ? increment(1) : confessionDoc.data()?.downvotes
      });
    });
  },
  async flagConfession(confessionId: string) {
    const confessionRef = doc(db, 'confessions', confessionId);
    await runTransaction(db, async (transaction) => {
      const doc = await transaction.get(confessionRef);
      const newReports = (doc.data()?.reports || 0) + 1;
      
      transaction.update(confessionRef, {
        reports: newReports,
        isFlagged: newReports >= 5
      });
    });
  }
};