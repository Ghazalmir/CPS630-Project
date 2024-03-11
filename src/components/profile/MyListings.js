import React from 'react';
import AdContainer from '../ads/adContainer';
import classes from "./MyListings.module.css"
const MyListings = () => {
  return (
    <div className={classes.listingsContainer}>
      <h3>My Listings</h3>
      <div className={classes.container}>
        <AdContainer/>
      </div>
    </div>
  );
}

export default MyListings;
