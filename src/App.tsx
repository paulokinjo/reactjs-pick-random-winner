import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import SignIn from './components/auth/SignIn';
import { FormEvent, useEffect, useState } from 'react';
import ContestCardList from './components/cards/ContestCardList';
import { Observer } from 'mobx-react-lite';
import { useStores } from './stores/useStore';
import { FirebaseSubscription } from './helpers/firebaseSubscription';

import HowTo from './components/info/HowTo';
import Controls from './components/controls/Controls';

const App = () => {
  const [addContestInput, setContestInput] = useState('');
  const [loggedInUser] = useAuthState(auth.getAuth());
  const { contestStore } = useStores();

  useEffect(() => {
    const unsubsribe = FirebaseSubscription.subscribe(contestStore);

    return () => {
      if (unsubsribe) unsubsribe();
    };
  }, [contestStore]);

  if (loggedInUser) {
    const handleSignOut = () => auth.getAuth().signOut();

    const handleUpdateContest = async (
      event: React.FormEvent<HTMLFormElement>,
      uid: string,
      name: string,
    ) => {
      event.preventDefault();
      await contestStore.updateContest(uid, name);
    };

    const handleDeleteContest = async (uid: string) =>
      await contestStore.deleteContest(uid);

    const handleAddContest = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await contestStore.addContest(addContestInput);
      setContestInput('');
    };

    const handleWinner = async () =>
      await contestStore.updateContestWinner(true);

    const handleResetWinner = async () =>
      await contestStore.updateContestWinner(false);

    return (
      <div className="container">
        <div className="row">
          <HowTo />
        </div>
        <div className="row">
          <Observer>
            {() => (
              <Controls
                onRandomWinner={handleWinner}
                onResetWinner={handleResetWinner}
                onSignOut={handleSignOut}
                isWinner={contestStore.winner?.isWinner || false}
              />
            )}
          </Observer>
        </div>
        <div className="row">
          <div className="col-12 input-addname">
            <form onSubmit={handleAddContest}>
              <input
                placeholder="Type something and press [Enter]"
                type="text"
                className="form-control input-lg"
                autoFocus
                name="contest-input"
                tabIndex={0}
                value={addContestInput}
                onChange={(e) => setContestInput(e.target.value)}
              />
            </form>
          </div>
          <div className="row">
            <Observer>
              {() => (
                <ContestCardList
                  contests={contestStore.contests}
                  onUpdateContest={handleUpdateContest}
                  onDeleteContest={handleDeleteContest}
                />
              )}
            </Observer>
          </div>
        </div>
      </div>
    );
  } else {
    return <SignIn />;
  }
};

export default App;
