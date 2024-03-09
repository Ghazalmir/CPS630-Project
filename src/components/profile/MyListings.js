import React from 'react';
import AdContainer from '../ads/adContainer';
import "./MyListings.css"
const MyListings = () => {
  return (
    <div className='listings-container'>
      <h3>My Listings</h3>
      <div className='container'>
        <AdContainer/>
      </div>
    </div>
  );
}

export default MyListings;
