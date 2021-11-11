import { render, screen } from '@testing-library/react';
import Controls from './Controls';

const onRandomWinner = jest.fn();
const onResetWinner = jest.fn();
const onSignOut = jest.fn();

describe('Controls', () => {
  beforeEach(() => {
    render(
      <Controls
        onRandomWinner={onRandomWinner}
        onResetWinner={onResetWinner}
        onSignOut={onSignOut}
        isWinner={false}
      />,
    );
  });
  describe('Layout', () => {
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
  });
});
