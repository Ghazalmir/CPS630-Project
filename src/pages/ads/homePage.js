import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filters from '../../components/ads/adFilters.js';
import AdContainer from '../../components/ads/adContainer.js';

function HomePage() {
  return (
    <Container fluid>
      <Row>
        {/* Adjust the size of the filters column by changing the col sizes */}
        <Col md={3} sm={4} xs={6}><Filters /></Col> {/* Example: Set md=3 for medium screens, sm=4 for small screens, xs=6 for extra small screens */}
        <Col><AdContainer /></Col>
      </Row>
    </Container>
  );
}

export default HomePage;