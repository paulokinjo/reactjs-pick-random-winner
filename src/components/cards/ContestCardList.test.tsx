import { render, screen } from '@testing-library/react';
import ContestCardList from './ContestCardList';

const onUpdateContest = jest.fn();
const onDeleteContest = jest.fn();

describe('ContestCardList', () => {
  let container: HTMLElement;
  describe('Layout', () => {
    beforeEach(() => {
      const rendered = render(
        <ContestCardList
          contests={[
            {
              name: 'Test Contests',
              isWinner: false,
              createdAt: null,
              updatedAt: null,
            },
            {
              name: 'Test Contests 2',
              isWinner: false,
              createdAt: null,
              updatedAt: null,
            },
          ]}
          onUpdateContest={onUpdateContest}
          onDeleteContest={onDeleteContest}
        />,
      );

      container = rendered.container;
    });

    test('renders the name of the card', () => {
      expect(screen.getByText('Test Contests')).toBeInTheDocument();
    });

    test('renders all items in the list ', () => {
      const cards = container.getElementsByClassName('card-item');
      expect(cards.length).toBe(2);
    });
  });
});
