// src/components/HistoryList.js
import React from 'react';
import './HistoryList.css';

const HistoryList = ({ histories }) => {
    return (
        <div className="history-list">
            <h2>History Records</h2>
            <ul>
                {histories.map((history, index) => (
                    <li key={index}>
                        {history.date} - {history.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryList;
