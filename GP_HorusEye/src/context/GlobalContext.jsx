import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [Email, setEmail] = useState(() => {
        const storedValue = localStorage.getItem('Email');
        return storedValue ? JSON.parse(storedValue) : null;
    });

    useEffect(() => {
        localStorage.setItem('Email', JSON.stringify(Email));
    }, [Email]);

    useEffect(() => {
        const inactivityTimeout = setTimeout(() => {
            localStorage.removeItem('Email');
        }, 900000); // 15 minutes (adjust as needed)

        const resetInactivityTimeout = () => {
            clearTimeout(inactivityTimeout);
            const newTimeout = setTimeout(() => {
                localStorage.removeItem('Email');
            }, 300000); // Reset timeout
        };

        window.addEventListener('mousemove', resetInactivityTimeout);
        window.addEventListener('keydown', resetInactivityTimeout);

        return () => {
            window.removeEventListener('mousemove', resetInactivityTimeout);
            window.removeEventListener('keydown', resetInactivityTimeout);
            clearTimeout(inactivityTimeout);
        };
    }, [Email]);

    return (
        <GlobalContext.Provider value={{ Email, setEmail }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
