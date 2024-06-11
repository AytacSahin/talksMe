import React, { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const useMyContext = () => useContext(MyContext);

export const MyProvider = ({ children }) => {
    const [conversations, setConversations] = useState([]);
    const [userId, setUserId] = useState(null);

    const handleChangeConversations = (updatedConversations) => {
        setConversations(updatedConversations);
    };

    
    const handleChangeUser = (id) => {
        setUserId(id);
    };

    return (
        <MyContext.Provider value={{ conversations, handleChangeConversations, userId, handleChangeUser }}>
            {children}
        </MyContext.Provider>
    );
};
