import { render, screen, fireEvent } from '@testing-library/react';
import ContestCard from './ContestCard';

const onUpdateContest = jest.fn();
const onDeleteContest = jest.fn();

describe('ContestCard', () => {
  let container: HTMLElement;
  beforeEach(() => {
    const rendered = render(
      <ContestCard
        contest={{
          name: 'Test Contests',
          isWinner: false,
          createdAt: null,
          updatedAt: null,
        }}
        onUpdateContest={onUpdateContest}
        onDeleteContest={onDeleteContest}
      />,
    );

    container = rendered.container;
  });

  describe('Layout', () => {
    test('renders the name of the card', () => {
      expect(screen.getByText('Test Contests')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    test('should call for onDeleteContest when "trash-icon" clicked', () => {
      const card = container.getElementsByTagName('span')[0];
      card.click();
      expect(onDeleteContest).toHaveBeenCalled();
    });

    test('should call for onUpdateContest when input change', () => {
      const card = screen.getByText('Test Contests');
      card.click();

      const form = container.querySelector('form');
      const input = form.querySelector('input');
      fireEvent.submit(input);

      expect(onUpdateContest).toHaveBeenCalled();
    });

    test('should flip the card when clicked', () => {
      const card = screen.getByText('Test Contests');
      card.click();

      expect(container.querySelector('.flipped')).toBeInTheDocument();
    });

    test('should flip the card when clicked while in front face', () => {
      const card = screen.getByText('Test Contests');
      card.click();

      const frontDiv = container.querySelector('.front');
      const cancelButton = frontDiv.querySelector('button');
      cancelButton.click();

      expect(
        container.querySelector('.flipped'),
      ).not.toBeInTheDocument();
    });
  });
});
