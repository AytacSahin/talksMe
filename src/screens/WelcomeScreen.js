import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
    const navigate = useNavigate();

    const handlePress = (screenName) => {
        navigate(`/${screenName.toLowerCase()}`);
    };
    

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="bg-green-700 flex justify-center items-end w-full h-3/5 rounded-b-3xl">
                <h1 className="text-white text-4xl font-bold leading-none py-4">TalksMe</h1>
            </div>
            <div className="flex flex-col space-y-4 mt-10">
                <button
                    onClick={() => handlePress('login')}
                    className="bg-green-700 text-white py-3 px-6 rounded text-xl font-semibold"
                >
                    Giriş Yap
                </button>
                <button
                    onClick={() => handlePress('register')}
                    className="bg-green-700 text-white py-3 px-6 rounded text-xl font-semibold"
                >
                    Kayıt Ol
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
