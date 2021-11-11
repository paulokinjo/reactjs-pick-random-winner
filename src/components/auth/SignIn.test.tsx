import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('Sign In', () => {
  let container: HTMLElement;
  beforeEach(() => {
    const rendered = render(<SignIn />);
    container = rendered.container;
  });

  describe('Layout', () => {
    test('renders Sign In text', () => {
      const signInText = screen.getByText('Sign In');
      expect(signInText).toBeInTheDocument();
    });

    test('renders a sign in button', () => {
      const signInButton = container.querySelector('button');
      expect(signInButton).toBeInTheDocument();
    });
  });
});
