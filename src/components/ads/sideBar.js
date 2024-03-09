import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Collapse from 'react-bootstrap/Collapse';
import './adContainer.css';

function AdFilters() {
    const [open, setOpen] = useState(false);

    return (
        <div className="container d-flex justify-content-center pt-5 side-bar">
            <ul className="list-unstyled">
                <li>
                    <button className='btn align-items-center rounded collapsed'>
                        Items Wanted
                    </button>
                </li>
                <li>
                    <button className='btn align-items-center rounded collapsed'>
                        Items for Sale
                    </button>
                </li>
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="btn btn-toggle align-items-center rounded collapsed sidebar-dropdown" onClick={() => setOpen(!open)}>
                            Academic Services
                        </Dropdown.Toggle>
                        <Collapse in={open}>
                            <div>
                                <ul>
                                    <li>
                                        <a href="#Tutoring">Tutoring</a>
                                    </li>
                                    <li>
                                        <a href="#Textbooks">Textbooks</a>
                                    </li>
                                </ul>
                            </div>
                        </Collapse>
                    </Dropdown>
                </li>
            </ul>
        </div>
    );
}

export default AdFilters;