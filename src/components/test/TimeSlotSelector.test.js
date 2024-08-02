import {act} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TimeSlotSelector from '../TimeSlot/TimeSlotSelector';

// Mock data
const mockSlotsData = [
  { displayDate: '2024-08-01', displayTime: '10:00 AM', displayTimeEnd: '10:30 AM' },
  { displayDate: '2024-08-01', displayTime: '11:00 AM', displayTimeEnd: '11:30 AM' },
  { displayDate: '2024-08-02', displayTime: '10:00 AM', displayTimeEnd: '10:30 AM' },
];

jest.mock('../../data/data.json', () => mockSlotsData);

describe('TimeSlotSelector Component', () => {
  test('renders date options and allows date selection', () => {
    render(<TimeSlotSelector />);

    // Check if the component renders correctly
    expect(screen.getByText(/Pick a date/i)).toBeInTheDocument();

    // Check if dates are rendered
    const date1 = screen.getByText(/Thu/i);
    const date2 = screen.getByText(/Fri/i);
    expect(date1).toBeInTheDocument();
    expect(date2).toBeInTheDocument();

    // Click on a date and check if it's selected
    fireEvent.click(date1);
    expect(date1).toHaveClass('selected');
  });

  test('displays time slots when a date is selected', () => {
    render(<TimeSlotSelector />);

    // Select a date
    fireEvent.click(screen.getByText(/Thu/i));

    // Check if time slots for the selected date are displayed
    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/11:00 AM/i)).toBeInTheDocument();
  });

  test('selects a time slot and displays it', () => {
    render(<TimeSlotSelector />);

    // Select a date
    fireEvent.click(screen.getByText(/Thu/i));

    // Click on a time slot
    fireEvent.click(screen.getByText(/10:00 AM/i));

    // Check if the selected slot is displayed
    expect(screen.getByText(/10:00 AM - 10:30 AM/i)).toBeInTheDocument();
  });

  test('scrolls left and right', () => {
    render(<TimeSlotSelector />);

    // Mock functions for scroll behavior
    const scrollLeft = jest.fn();
    const scrollRight = jest.fn();

    // Mock the scroll method
    jest.spyOn(HTMLElement.prototype, 'scrollBy').mockImplementation((options) => {
      if (options.left < 0) scrollLeft();
      else scrollRight();
    });

    // Trigger scroll left
    fireEvent.click(screen.getByText(/←/i));
    expect(scrollLeft).toHaveBeenCalled();

    // Trigger scroll right
    fireEvent.click(screen.getByText(/→/i));
    expect(scrollRight).toHaveBeenCalled();
  });
});
