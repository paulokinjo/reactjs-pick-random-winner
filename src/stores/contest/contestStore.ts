import {
  action,
  observable,
  makeObservable,
  computed,
  runInAction,
} from 'mobx';
import Contest from '../../models/contest.model';

import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CONTESTS_DOC_PATH } from '../../helpers/constants';
import { database } from '../../firebase';

export default class ContestStore {
  contests: Contest[] = [];

  constructor() {
    makeObservable(this, {
      contests: observable,
      addContest: action,
      loadContests: action,
      updateContest: action,
      deleteContest: action,
      updateContestWinner: action,
      winner: computed,
    });
  }

  async addContest(name: string) {
    const { currentUser } = getAuth();
    const timeStamp = serverTimestamp();
    const docData = {
      name,
      createdAt: timeStamp,
      createdBy: currentUser?.uid,
    } as Contest;

    await setDoc(
      doc(collection(database, FIREBASE_CONTESTS_DOC_PATH)),
      docData,
    );

    this.contests.push(docData);
  }

  async updateContest(uid: string, name: string) {
    const contestToUpdateIndex = this.contests.findIndex((c) => c.uid === uid);
    if (contestToUpdateIndex >= 0) {
      await updateDoc(doc(database, FIREBASE_CONTESTS_DOC_PATH, uid), {
        name,
        updatedAt: serverTimestamp(),
        updatedBy: getAuth().currentUser?.uid,
      });
    }
  }

  async updateContestWinner(isWinner: boolean) {
    let theWinner = '';

    if (isWinner) {
      theWinner = this.getRandomWinner();
    } else {
      theWinner = this.winner?.uid as string;
    }

    const contestToUpdateIndex = this.contests.findIndex(
      (c) => c.uid === theWinner,
    );

    if (contestToUpdateIndex >= 0) {
      await updateDoc(doc(database, FIREBASE_CONTESTS_DOC_PATH, theWinner), {
        isWinner,
      });
    }
  }

  async loadContests() {
    const querySnapshot = await getDocs(
      collection(database, FIREBASE_CONTESTS_DOC_PATH),
    );

    runInAction(() => {
      this.contests = querySnapshot.docs
        .map((d) => {
          const doc = d.data();
          const uid = d.id;

          const { name, createdAt, updatedAt, createdBy, updatedBy, isWinner } =
            doc;
          return {
            name,
            createdAt,
            updatedAt,
            createdBy,
            updatedBy,
            uid,
            isWinner,
          };
        })
        .sort((a: Contest, b: Contest) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
    });
  }

  async deleteContest(uid?: string) {
    await deleteDoc(doc(database, FIREBASE_CONTESTS_DOC_PATH, uid || ''));
  }

  get winner() {
    return this.contests.find((c) => c.isWinner);
  }

  private getRandomWinner() {
    let random = Math.random() * this.contests.length;
    random = Math.floor(random);
    console.log(random);
    return this.contests[random].uid || '';
  }
}
