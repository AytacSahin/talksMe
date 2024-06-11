import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatKeyboard from './ChatKeyboard';
import { AiOutlineLeft } from 'react-icons/ai';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useMyContext } from '../context/Context';

const socket = io('http://192.168.1.48:9000'); // backend sunucu adresi

const ConversationDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { chatName, chatId, chatType } = location.state;

    const { userId } = useMyContext();

    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (chatId) {
            axios.get(`http://192.168.1.48:9000/api/messages/chats/${chatId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [chatId]);

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            console.log('New message received:', message);
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const goBack = () => {
        navigate(-1);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (message) => {
        try {
            const newMessage = {
                chatId: chatId,
                userId: userId, // TODO: Login kullanıcı alınacak.
                content: message,
                type: 'text'
            };
            

            socket.emit('sendMessage', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-800 flex justify-between items-center p-4">
                <button onClick={goBack} className="text-white border border-white rounded-full p-[0.4rem]">
                    <AiOutlineLeft size={20} />
                </button>
                <h1 className="text-white text-xl">{chatName}</h1>
            </div>

            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((item) => (
                    <div key={item.message_id} className={userId == item.sender_id ? 'flex justify-end mb-4' : 'mb-4'}>
                        <div className={userId == item.sender_id ? 'bg-green-200 rounded p-2' : 'bg-gray-200 rounded p-2'}>
                            {chatType === 'person' ?
                                <p className="text-gray-800">{item.text}</p> :
                                <p className="text-gray-800">{item.sender_name}: {item.text}</p>}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <ChatKeyboard sendMessage={sendMessage} />
        </div>
    );
};

export default ConversationDetails;
