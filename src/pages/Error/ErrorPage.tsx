import React from 'react';
import './Error.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper h-100 w-100">
      <div className="error-container">
        <h1 className="error-title">404</h1>
        <p className="error-message">Oops! The page you are looking for does not exist.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
