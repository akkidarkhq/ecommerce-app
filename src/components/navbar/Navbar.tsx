import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { useAuth } from '../../context/AuthContext';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';
import Cart from '../cart/Cart';

const Navbar: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get('searchQuery') as string;
    if (searchValue.trim() !== '') {
      navigate(`/products?query=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    navigate(`/products`);
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={'https://banner2.cleanpng.com/lnd/20241010/wb/bc1be8d272002f072e2225557b430b.webp'}
            alt="Company Logo"
            width="40"
            height="50"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item"></li>
          </ul>
          <div>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                value={searchQuery}
                type="search"
                name="searchQuery"
                placeholder="Search for products"
                aria-label="Search"
                onChange={handleSearchQueryChange}
              />
              <div className="btn-group" role="group" aria-label="Basic example">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="bi bi-search"></i>
                </button>
                {searchQuery && (
                  <button className="btn btn-outline-danger" onClick={handleClearSearch} type="reset">
                    <i className="bi bi-x-circle-fill"></i>
                  </button>
                )}
              </div>
            </form>
          </div>
          <button className="btn btn-outline-secondary ms-2 position-relative" onClick={() => setShowCartModal(true)}>
            <i className="bi bi-cart"></i>
            <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
              <span className="visually-hidden">New alerts</span>
            </span>
          </button>

          <ThemeSwitcher />
          {isLoggedIn ? (
            <button className="btn btn-outline-secondary" onClick={logout}>
              Logout <i className="bi bi-box-arrow-right"></i>
            </button>
          ) : (
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  login(credentialResponse.credential);
                }
              }}
              onError={() => console.error('Login Failed')}
            />
          )}
        </div>
      </div>
      {showCartModal && <Cart onClose={() => setShowCartModal(false)} onOrder={() => console.warn('Order placed!')} />}
    </nav>
  );
};

export default Navbar;
