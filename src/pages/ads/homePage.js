import React from 'react';
import Sidebar from '../../components/ads/sideBar.js';
import AdContainer from '../../components/ads/adContainer.js';

function HomePage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4 col-md-2 d-none d-md-block">
          <Sidebar />
        </div>
        <div className="col-sm-12 col-md-10">
          <AdContainer />
        </div>
      </div>
    </div>
  );
}

export default HomePage;