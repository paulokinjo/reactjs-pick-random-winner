import { StoreContext } from './storeContext';
import { useContext } from 'react';
import RootStore from './rootStore';

export const useStores = () => {
  return useContext<RootStore>(StoreContext);
};
