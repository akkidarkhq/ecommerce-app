import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/header/Header';
import Content from './components/layout/content/Content';
import Footer from './components/layout/footer/Footer';
import ErrorPage from './pages/error/ErrorPage';
import { store, persistor } from './store/store';

const CLIENT_ID = '362557444672-hnm4kms5mtck0f67inaoqdbuvjare2bt.apps.googleusercontent.com';
function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router>
              <div className="d-flex flex-column vh-100">
                <Header />
                <div className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<Navigate to="/products" />} />
                    <Route path="/products" element={<Content />} />
                    <Route path="/products/category/:category" element={<Content />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </Router>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
