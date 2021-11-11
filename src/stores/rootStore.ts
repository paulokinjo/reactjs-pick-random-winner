import ContestStore from './contest/contestStore';

export default class RootStore {
  contestStore: ContestStore;

  constructor(contestStore: ContestStore) {
    this.contestStore = contestStore || new ContestStore();
  }
}
