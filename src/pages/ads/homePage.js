import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from '../../components/ads/sideBar.js';
import AdContainer from '../../components/ads/adContainer.js';

function HomePage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4 col-md-3 col-12">
          <Sidebar />
        </div>
        <div className="col-sm-8 col-md-9 col-12">
          <AdContainer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;