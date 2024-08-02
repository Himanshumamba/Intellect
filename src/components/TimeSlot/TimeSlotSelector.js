import React, { useState, useEffect, useRef } from 'react';
import slotsData from '../../data/data.json'; // Ensure this path points to your JSON file
import './TimeSlotSelector.css';

const TimeSlotSelector = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Load the dates
    setDates(slotsData);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Group slots by date
  const groupedSlots = dates.reduce((acc, slot) => {
    if (!acc[slot.displayDate]) {
      acc[slot.displayDate] = [];
    }
    acc[slot.displayDate].push(slot);
    return acc;
  }, {});

  return (
    <div className="time-slot-selector">
      <h1>Intellect</h1>
      <h3 className='Pickdate'>Pick a date</h3>

      <div className="slider-container">
        <button className="arrow-button left-arrow" onClick={() => scroll('left')}>&#8592;</button>
        <div className="date-slider" ref={sliderRef}>
          {Object.keys(groupedSlots).map((date) => (
            <div
              key={date}
              className={`date-box ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className="date-text">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {new Date(date).toLocaleDateString('en-US', { day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-button right-arrow" onClick={() => scroll('right')}>&#8594;</button>
      </div>

      {selectedDate && (
        <div className="slot-selector">
          <h3 className='avail_timeslot'>Available time slots</h3>
          <p className="session-duration">Each session lasts for 30 minutes</p>
          <div className="slots">
            {groupedSlots[selectedDate]?.map((slot, index) => (
              <div
                key={index}
                className={`slot ${selectedSlot === slot ? 'selected' : ''}`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.displayTime}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="selected-slot">
          <h3>Selected Slot</h3>
          <p>{selectedSlot.displayTime} - {selectedSlot.displayTimeEnd}</p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;
