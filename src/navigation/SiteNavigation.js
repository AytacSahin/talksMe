import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import ChatMainPageScreen from '../screens/ChatMainPage';
import ConversationDetailsScreen from '../components/ConversationDetails';


const SiteNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/chat" element={<ChatMainPageScreen />} />
      <Route path="/conversation/:chatId" element={<ConversationDetailsScreen />} />
    </Routes>
  );
};

export default SiteNavigation;
