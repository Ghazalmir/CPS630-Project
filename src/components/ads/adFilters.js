import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './adContainer.css';

function adFilters() {
    return (
        <Container className="p-5 mr-auto filter-container">
            <Row className="justify-content-center">
                <span className="mr-auto h5 category">Items Wanted</span>
            </Row>
            <Row className="justify-content-center">
                <span className="mr-auto h5 category">Items for Sale</span>
            </Row>

            <Row className="justify-content-center">
                <Dropdown>
                    <Dropdown.Toggle className="academic-services">
                        <span className="mr-auto h5 category">Academic Services</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1"><span className="mr-auto h5 category">Tutorings</span></Dropdown.Item>
                        <Dropdown.Item href="#/action-2"><span className="mr-auto h5 category">Textbooks</span></Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
            </Row>
        </Container>

    );
}

export default adFilters;