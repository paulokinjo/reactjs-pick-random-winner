import ContestStore from './contest/contestStore';
import RootStore from './rootStore';

export const createStore = () => {
  return new RootStore(new ContestStore());
};
