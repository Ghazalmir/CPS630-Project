import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './adContainer.css';

function sideBar() {

    return (
        <div className="container d-flex justify-content-center pt-5 side-bar">
            <ul className="list-unstyled">
                <li>
                    <button className='btn align-items-center category'>
                        Items Wanted
                    </button>
                </li>
                <li>
                    <button className='btn align-items-center category'>
                        Items for Sale
                    </button>
                </li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="sidebar-dropdown category">
                            Academic Services
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-tutoring">Tutoring</Dropdown.Item>
                            <Dropdown.Item href="#/action-textbooks">Textbooks</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
}

export default sideBar;