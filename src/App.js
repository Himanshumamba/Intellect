import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmojiRatingWidget from './components/Emoji/EmojiRatingWidget';
import TimeSlotSelector from './components/TimeSlot/TimeSlotSelector';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<EmojiRatingWidget />} />
        <Route path="/timeslots" element={<TimeSlotSelector />} />
      </Routes>
    </Router>
  );
};

export default App;
