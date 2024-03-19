import './Navbar.css'
import { ReactComponent as SearchIcon } from '../../Other/icons8-search.svg';
import React, { useState } from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

function Navbar({ logged_in, is_admin }) {
  const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv)
  };

    return (
      <nav className="navbar navbar-expand-lg mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="/HomePage">Website Name</a>
          <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleDiv}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/HomePage">Home</a>
              </li>
              { logged_in ? (
                <>
                <li className="nav-item">
                  <a className="nav-link" href="/MyAccount">My Account</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/NewAd">Create New Ad</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Messages">Messages</a>
                </li>
                </>
                ) : (
                <>
                <li className="nav-item">
                  <a className="nav-link" href="/NewAd">Create New Ad</a>
                </li>
                <li className="nav-item">
                  <div className="nav-link-group">
                    <a className="nav-link" href="#">Sign Up</a>
                    <span>/</span>
                    <a className="nav-link" href="#">Log In</a>
                  </div>
                </li>
                </>
                )}
            <Dropdown style={{ display: showDiv ? 'block' : 'none' }}>
                <Dropdown.Toggle className="categories-title" variant="success" id="dropdown-basic">
                  Categories
                </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-categories">
                <Dropdown.Item className="categories" href="#/action-1">Tutoring</Dropdown.Item>
                <Dropdown.Item className="categories" href="#/action-2">Textbooks</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            { is_admin ? (
              <>
              <li className="nav-item">
                  <a className="nav-link" href="/AdminPanel">Admin Panel</a>
                </li>
              </>
            ) : (<></>)  }
              
            </ul>
            <form className="d-flex search-form" role="search">
              <div className="search-bar-container">
                <input className="form-control me-2" type="search" placeholder="What are you looking for?" aria-label="Search" />
                <button className="btn btn-outline-light search-icon" type="button">
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;