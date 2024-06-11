import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMyContext } from '../context/Context';

const ChatMainPage = () => {
    const [conversations, setConversations] = useState([]);
    const { userId } = useMyContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            axios.get(`http://192.168.1.48:9000/api/messages/${userId}`)
                .then(response => {
                    setConversations(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [userId]);

    const handleConversationClick = (chatName, chatId, chatType) => {
        console.log('chatName:', chatName);
        console.log('chatId:', chatId);
        console.log('chatType:', chatType);
        navigate(`/conversation/${chatId}`, { state: { chatName, chatId, chatType } });
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <div className="h-24 bg-green-700 flex items-center justify-center">
                <h1 className="text-white text-2xl font-bold">TalksMe</h1>
            </div>
            

            {/* Conversation List */}
            <div className="flex-grow overflow-y-auto p-4">
                {conversations.map((item) => {
                    let initials = item.name.split(' ')[0].slice(0, 2).toUpperCase();
                    if (item.name.split(' ').length === 1) {
                        initials = item.name.slice(0, 2).toUpperCase();
                    }
                    let lastMessage = item.lastMessage.text.substring(0, 45);
                    if (item.lastMessage.text.length > 50) {
                        lastMessage += '...';
                    }

                    return (
                        <div
                            key={item.chat_id}
                            className="flex items-center p-4 border-b border-gray-300 cursor-pointer"
                            onClick={() => handleConversationClick(item.name, item.chat_id, item.type)}
                        >
                            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center mr-4">
                                <span className="text-white text-lg font-bold">{initials}</span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-lg">{item.name}</p>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold">{item.lastMessage.sender_name}:</span> {lastMessage}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* New Message Button */}
            <button className="h-14 bg-green-700 text-white text-lg font-bold flex items-center justify-center">
                Yeni Mesaj
            </button>
        </div>
    );
};

export default ChatMainPage;
