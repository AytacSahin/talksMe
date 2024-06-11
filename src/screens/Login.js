import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/Context';

const LoginScreen = () => {
    const navigate = useNavigate();
    const { handleChangeUser } = useMyContext();

    const handlePress = (screenName, userId) => {
        handleChangeUser(userId);
        navigate(`/${screenName.toLowerCase()}`);
    };

    
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-gray-900 text-4xl font-semibold text-center mb-5">Welcome Back!</h1>
            <div className="flex space-x-4">
                <button
                    onClick={() => handlePress('chat', '1')}
                    className="bg-green-700 text-white py-3 px-5 rounded text-xl font-semibold"
                >
                    Login as test1
                </button>
                <button
                    onClick={() => handlePress('chat', '2')}
                    className="bg-green-700 text-white py-3 px-5 rounded text-xl font-semibold"
                >
                    Login as test2
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
