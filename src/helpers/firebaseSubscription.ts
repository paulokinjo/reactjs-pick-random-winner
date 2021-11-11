import { database } from '../firebase';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { FIREBASE_CONTESTS_DOC_PATH } from '../helpers/constants';
import ContestStore from '../stores/contest/contestStore';

const subscribe = (store: ContestStore) => {
  const q = query(collection(database, FIREBASE_CONTESTS_DOC_PATH));
  return onSnapshot(q, async (_) => {
    await store.loadContests();
  });
};

export const FirebaseSubscription = {
  subscribe,
};
