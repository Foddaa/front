import React from "react";
const PopUp = ({ message, onClose }) => {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  export default PopUp;