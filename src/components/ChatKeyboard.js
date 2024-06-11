import React, { useState } from 'react';

const ChatKeyboard = ({ sendMessage }) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    

    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
            sendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <div className="flex items-center justify-between px-4 mb-8">
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 h-12 px-4 bg-white border border-gray-300 rounded-full mr-4 focus:outline-none"
            />
            <button onClick={handleSendMessage} className="h-12 px-6 bg-green-700 text-white rounded-full font-semibold text-lg">
                Send
            </button>
        </div>
    );
};

export default ChatKeyboard;
