import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginModal from '../login/LoginModal';

const HomePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    setShowModal(true);
  };

  const handleLoginSuccess = (_response: any) => {
    setShowModal(false);
    navigate('/products');
  };

  const handleLoginFailure = (error: any) => {
    console.error('Login Failed:', error);
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="mb-3">Welcome to Our E-Commerce Store</h1>
      <p className="mb-4">
        Discover the latest trends, exclusive deals, and best-selling products. Shop now and enjoy amazing offers!
      </p>
      <button className="btn btn-primary btn-lg" onClick={handleShopNowClick}>
        Start Shopping Now
      </button>

      <LoginModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onLoginSuccess={handleLoginSuccess}
        onLoginFailure={handleLoginFailure}
      />
    </div>
  );
};

export default HomePage;
