// ScrollToggleButton.js
import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import './Home.css';

const ScrollToggleButton = () => {
  const [atBottom, setAtBottom] = useState(false);

  const handleClick = () => {
    if (atBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
    setAtBottom(!atBottom);
  };

  return (
    <button
      className={`scroll-toggle-button ${atBottom ? 'active' : ''}`}
      onClick={handleClick}
    >
      {atBottom ? <FaArrowUp /> : <FaArrowDown />}
    </button>
  );
};

export default ScrollToggleButton;
