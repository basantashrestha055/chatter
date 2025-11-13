import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import PageLoader from './components/PageLoader';

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className='min-h-screen h-full' data-theme={theme}>
      <Routes>
        <Route
          path='/'
          element={authUser ? <ChatPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to='/' />}
        />
        <Route
          path='/signup'
          element={!authUser ? <SignupPage /> : <Navigate to='/' />}
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
