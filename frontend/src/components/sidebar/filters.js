import React, { useState } from 'react';
import './filters.css';

function Filters() {
  const [isSortByCollapsed, setIsSortByCollapsed] = useState(true);
  const [isPriceCollapsed, setIsPriceCollapsed] = useState(true);
  const [isLocationCollapsed, setIsLocationCollapsed] = useState(true);
  const [selectedSortBy, setSelectedSortBy] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSortByToggle = () => {
    setIsSortByCollapsed(!isSortByCollapsed);
  };

  const handlePriceToggle = () => {
    setIsPriceCollapsed(!isPriceCollapsed);
  };

  const handleLocationToggle = () => {
    setIsLocationCollapsed(!isLocationCollapsed);
  };

  const handleSortBySelect = (e) => {
    setSelectedSortBy(e.target.value);
  };

  const handlePriceSelect = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation(e.target.value);
  };

  return (
    <div className="collapsible-container">
      <p className="filters-heading">Filters</p>
      <div className="filters-container">
      <div className="filter-sortby">
        <button className="collapsible-button-filter" onClick={handleSortByToggle}>
          Sort by
        </button>
        <div className={`collapsible-content d-${isSortByCollapsed ? 'none' : 'block'}`}>
          <div className="form-check">
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="sortby-lowest-first" value="ORDER BY price ASC" onChange={handleSortBySelect} />
              <label className="form-check-label">
                Price: lowest first
              </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="sortby-highest-first" value="ORDER BY price DESC" onChange={handleSortBySelect}/> 
              <label className="form-check-label">
                Price: highest first
              </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="sortby-ascending" value="ORDER BY title ASC" onChange={handleSortBySelect}/> 
              <label className="form-check-label">
                Order: A-Z
              </label>
            </div>
            <div> 
              <input className="form-check-input" type="radio" name="exampleRadios" id="sortby-descending" value="ORDER BY title DESC" onChange={handleSortBySelect}/> 
              <label className="form-check-label">
                Order: Z-A
              </label>
            </div>
        </div>
      </div>
      </div>
      <div className="filter-price">
        <button className="collapsible-button-filter" onClick={handlePriceToggle}>
          Price
        </button>
        <div className={`collapsible-content d-${isPriceCollapsed ? 'none' : 'block'}`}>
          <div className="form-check">
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="price-under25" value="price <= 25" onChange={handlePriceSelect} />
              <label className="form-check-label">
                Under $25
              </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="price-25to50" value="price >= 25 AND price <= 50" onChange={handlePriceSelect} /> 
              <label className="form-check-label">
                $25 to $50
              </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="price-50to100" value="price >= 50 AND price <= 100" onChange={handlePriceSelect} /> 
              <label className="form-check-label">
                $50 to $100
              </label>
            </div>
            <div>
            <input className="form-check-input" type="radio" name="exampleRadios" id="price-100to200" value="price >= 100 AND price <= 200" onChange={handlePriceSelect} /> 
            <label className="form-check-label">
              $100 to $200
            </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="price-above200" value="price <= 200" onChange={handlePriceSelect} /> 
              <label className="form-check-label">
                $200 & Above
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-location">
        <button className="collapsible-button-filter" onClick={handleLocationToggle}>
          Location
        </button>
        <div className={`collapsible-content d-${isLocationCollapsed ? 'none' : 'block'}`}>
          <div className="form-check">
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="meet-on-campus" value="meet_on_campus = 1" /> 
              <label className="form-check-label">
                Meet on Campus
              </label>
            </div>
            <div>
              <input className="form-check-input" type="radio" name="exampleRadios" id="custom-location" value="option1" /> 
              <label className="form-check-label">
                location search box
              </label>
            </div>
            </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Filters;