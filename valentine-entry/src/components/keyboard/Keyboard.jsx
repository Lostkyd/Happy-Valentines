import { useState } from 'react';
import './Keyboard.css';

export default function Keyboard({ onSubmit }) {
  const [input, setInput] = useState('');
  
  const keys = [
    ['Y', 'N', 'S', 'O'],
    ['E', 'I', 'L', 'U']
  ];
  const allowedKeys = ['Y', 'E', 'S'];
  const maxLength = 3;

  const handleKeyClick = (key) => {
    if (allowedKeys.includes(key) && input.length < maxLength) {
      setInput(input + key);
    }
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    if (allowedKeys.includes(key) && input.length < maxLength) {
      setInput(input + key);
    }
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleSubmit = () => {
    if (input.length === maxLength) {
      if (typeof onSubmit === 'function') {
        onSubmit(input);
      } else {
        alert(`Submitted: ${input}`);
      }
    } else {
      alert('Please enter 3 letters');
    }
  };

  return (
    <div className="keyboard-container">
      <input
        type="text"
        className="keyboard-display"
        value={input}
        onKeyDown={handleKeydown}
        placeholder="Type or click keys..."
        readOnly
      />
      <div className="keyboard-grid">
        {keys.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => (
              <button
                key={key}
                className="keyboard-key"
                onClick={() => handleKeyClick(key)}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="keyboard-controls">
        <button className="control-btn backspace" onClick={handleBackspace}>
          ← Back
        </button>
        <button className="control-btn submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
