import React, { useState } from 'react';
import './Profile.css'; // Import the stylesheet
import MyAccount from './MyAccount';
import MyListings from './MyListings';

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState('MyAccount');

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div
          className={`option ${selectedOption === 'MyAccount' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('MyAccount')}
        >
          My Account
        </div>
        <div
          className={`option ${selectedOption === 'MyListings' ? 'selected' : ''}`}
          onClick={() => handleOptionSelect('MyListings')}
        >
          My Listings
        </div>
      </div>
      <div className="main-content">
        {selectedOption === 'MyAccount' ? <MyAccount /> : <MyListings />}
      </div>
    </div>
  );
};

export default Profile;
