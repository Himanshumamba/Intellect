import { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EmojiRatingWidget from '../Emoji/EmojiRatingWidget'; 
import { BrowserRouter as Router } from 'react-router-dom';

global.alert = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('EmojiRatingWidget', () => {
  beforeEach(() => {
    render(
      <Router>
        <EmojiRatingWidget />
      </Router>
    );
  });

  test('renders the component with the correct elements', () => {
    // Check for the main heading
    expect(screen.getByText(/Wellbeing Check-in/i)).toBeInTheDocument();

    // Check for the subheading
    expect(screen.getByText(/How are you feeling today\?/i)).toBeInTheDocument();

    // Check for all emoji containers and labels
    const emojis = screen.getAllByText(/Angry|Confused|Neutral|Happy|Excited/i);
    expect(emojis).toHaveLength(5);

    // Check for the Continue button
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();

    // Check for Back and Close buttons
    expect(screen.getByRole('button', { name: /←/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  test('clicking an emoji selects it', () => {
    const happyEmoji = screen.getByText('😊');
    act(() => {
      fireEvent.click(happyEmoji);
    });

    // Ensure the emoji container has the 'selected' class
    expect(happyEmoji.parentElement).toHaveClass('selected');
  });

  test('clicking Continue button shows the selected emoji in the alert', () => {
    // Click on the "Happy" emoji
    act(() => {
      fireEvent.click(screen.getByText('😊'));
    });

    // Click the Continue button
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    });

    // Verify the alert was called with the correct message
    expect(global.alert).toHaveBeenCalledWith('You selected: Happy');
  });

  test('clicking Back button triggers the alert', () => {
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /←/i }));
    });
    expect(global.alert).toHaveBeenCalledWith('Back button clicked');
  });

  test('clicking Close button triggers the alert', () => {
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /×/i }));
    });
    expect(global.alert).toHaveBeenCalledWith('Close button clicked');
  });

  test('Continue button is disabled when no emoji is selected', () => {
    // Ensure the Continue button is disabled when no emoji is selected
    expect(screen.getByRole('button', { name: /Continue/i })).toBeDisabled();
  });

  test('Continue button is enabled when an emoji is selected', () => {
    // Click an emoji to select it
    act(() => {
      fireEvent.click(screen.getByText('😊'));
    });

    // Check that the Continue button is enabled
    expect(screen.getByRole('button', { name: /Continue/i })).toBeEnabled();
  });
});
