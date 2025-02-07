import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import Login from '../../pages/Login/Login';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

const Navbar: React.FC = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
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
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
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
            <li className="nav-item">
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
                      <i className="bi bi-x-square-fill"></i>
                    </button>
                  )}
                </div>
              </form>
            </li>
          </ul>
          {isLoggedIn ? (
            <button className="btn btn-outline-secondary" onClick={logout}>
              Logout <i className="bi bi-box-arrow-right"></i>
            </button>
          ) : (
            <Login onSuccess={login} />
          )}
          <ThemeSwitcher></ThemeSwitcher>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
