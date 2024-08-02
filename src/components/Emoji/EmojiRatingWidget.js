import React, { useState } from 'react';
import './EmojiRatingWidget.css';
import { useNavigate } from 'react-router-dom';

const emojis = [
  { emoji: '😠', label: 'Angry' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '😄', label: 'Excited' }
];

const EmojiRatingWidget = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const navigate = useNavigate();

  const handleEmojiClick = (index) => {
    setSelectedEmoji(index);
  };

  const handleContinueClick = () => {
    if (selectedEmoji !== null) {
      alert(`You selected: ${emojis[selectedEmoji].label}`);

      navigate('/timeslots');
    } else {
      alert('Please select an emoji first.');
    }
  };

  const handleBackClick = () => {
    alert('Back button clicked');
  };

  const handleCloseClick = () => {
    alert('Close button clicked');
  };

  return (
    <div className="emoji-rating-widget-card">
      <button className="back-button" onClick={handleBackClick}>&#8592;</button>
      <button className="close-button" onClick={handleCloseClick}>×</button>
      <h1>Wellbeing Check-in</h1>
      <p>How are you feeling today?</p>
      <div className="emojis">
        {emojis.map((item, index) => (
          <div
            key={index}
            className={`emoji-container ${selectedEmoji === index ? 'selected' : ''}`}
            onClick={() => handleEmojiClick(index)}
            aria-label={item.label}
          >
            <span className="emoji">{item.emoji}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
      <button
        className="continue-button"
        onClick={handleContinueClick}
        disabled={selectedEmoji === null}
      >
        Continue
      </button>
    </div>
  );
};

export default EmojiRatingWidget;
