// src/components/HistoryForm.js
import React, { useState, useEffect, useContext } from 'react';
import './HistoryForm.css';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';

const getMonthAndDay = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long' }; // This will give you the full month name (e.g., "July")
    const month = date.toLocaleString('en-US', options);
    const day = date.getDate();
    return `${month} ${day}`;
};

const History = () => {
    const { Email } = useContext(GlobalContext);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:8080/history/getHistory', {
                    params: {
                        email: Email
                    }
                });
                setHistory(response.data);
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        };

        if (window.location.pathname === '/ViewHistory') {
            fetchHistory();
        }

        return () => {
            // Perform any necessary cleanup here
        };
    }, [Email]);

    return (
        <div className="history-list">
            <h2>History Records</h2>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((item) => {
                        const monthDayString = getMonthAndDay(item.date);
                        return (
                            <tr key={item.id}>
                                <td>{monthDayString}</td>
                                <td>{item.landMarkId}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default History;
