import { render, screen } from '@testing-library/react';
import App from './App';
import { useAuthState } from './__mocks__/react-firebase-hooks/auth';

import { createStore } from './stores/createStore';
import { StoreProvider } from './stores/storeContext';

const rootStore = createStore();

rootStore.contestStore.addContest('Test');

jest.mock('@firebase/firestore', () => {
  return {
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    onSnapshot: jest.fn(),
    serverTimestamp: jest.fn(),
  };
});

describe('App', () => {
  beforeEach(() => {
    useAuthState.mockReturnValue([false, false]);
    render(
      <StoreProvider value={rootStore}>
        <App />
      </StoreProvider>,
    );
  });

  describe('Layout', () => {
    test('renders Sign In component', () => {
      const signInText = screen.getByText(/Sign In/i);
      expect(signInText).toBeInTheDocument();
    });

    describe('When signed in', () => {
      beforeEach(() => {
        useAuthState.mockReturnValue([true, false]);
        render(
          <StoreProvider value={rootStore}>
            <App />
          </StoreProvider>,
        );
      });

      test('renders Random Winner button', () => {
        const randomWinnerBtn = screen.getByText('Random Winner');
        expect(randomWinnerBtn).toBeInTheDocument();
      });

      test('renders Reset button', () => {
        const resetBtn = screen.getByText('Reset');
        expect(resetBtn).toBeInTheDocument();
      });

      test('renders Sign Out button', () => {
        const signOutBtn = screen.getByText(/Sign Out/i);
        expect(signOutBtn).toBeInTheDocument();
      });

      test('renders an input text for adding items', () => {
        const addNewItemInput = screen.getByPlaceholderText(
          'Type something and press [Enter]',
        );
        expect(addNewItemInput).toBeInTheDocument();
      });
    });
  });
});
