// Modal.js
import React, { useState } from "react";


function Modal({ isOpen, onClose }) {
  const [error, setError] = useState('');
  const [userInput, setUserInput] = useState('');
  if (!isOpen) return null;

  const handleSubmit = () => {
    //console.log('User input:', userInput); // or pass it to a parent
    onClose(userInput);
    window.location.reload();
     // close modal
  };


  return (
    <>
      {/* Background + Modal Wrapper */}
      <div
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => onClose(userInput)} // clicking the overlay closes the modal
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
          onClick={(e) => e.stopPropagation()} // prevent bubbling
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            onClick={() => onClose(userInput)}
          >
            &times;
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4 text-black">Game Over :(</h2>

          {/* Body */}
          <p className="mb-6 text-black text-center">
            Enter a three letter nickname below
          </p>

          {/* Text Input */}
          <input
            type="text"
            maxLength={3}
            placeholder="Your name"
            value={userInput}
            onChange={(e) => {
                  setUserInput(e.target.value);
                  setError(''); // clear error on change
                }}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          {error && <p className="error-text">{error}</p>}

          {/* Buttons */}
          <div className="flex w-full justify-end gap-4">
            <button
              className="w-1/2 bg-[#ED1D24] text-white px-4 py-2 rounded"
              onClick={() => {
                if (!userInput.trim()) {
                  setError("Please enter your nickname.");
                } else {
                  onClose(userInput);
                }
              }}
              //onClick={() => onClose(userInput)}
            >
              Return
            </button>
            <button
              className="w-1/2 bg-[#ED1D24] text-white px-4 py-2 rounded"
              onClick={() => {
                if (!userInput.trim()) {
                  setError("Please enter your nickname.");
                } else {
                  handleSubmit();
                }
              }}
              //onClick={handleSubmit}
            >
              Play again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
