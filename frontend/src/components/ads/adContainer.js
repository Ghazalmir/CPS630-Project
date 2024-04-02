import React, { useState, useEffect } from 'react';
import { useUser } from "../../userContext";
import axios from 'axios';
import './adContainer.css';
import ItemBlock from './itemBlock.js';
import { useLocation } from 'react-router-dom';

function AdContainer() {
    const { userId, setUserId } = useUser();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('selectedCategory');
    const categoryName = searchParams.get('categoryName');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');
    const searchQuery = searchParams.get('searchQuery');
    const [inputSearchQuery, setInputSearchQuery] = useState('');

    const [adData, setAdData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const isMyListings = location.pathname.includes('/MyListings');


    useEffect(() => {
        const fetchAdData = async () => {
            try {
                let apiUrl = 'http://localhost:8080/api/ads/products';
                if (searchQuery) {
                    apiUrl = `http://localhost:8080/api/ads/search?searchQuery=${searchQuery}`;
                }
                const response = await axios.get(apiUrl);
                setAdData(response.data.rows);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ad data:', error);
                setLoading(false);
                // Handle fetch error, e.g., show error message to the user
            }
        };
        fetchAdData();
    }, [searchQuery]);

    useEffect(() => {
        if (selectedCategory) {
            let filteredItems = adData.filter(item => item.category_id == selectedCategory);

            setSelectedCategoryName(categoryName);
            setFilteredData(filteredItems);
        } else if (searchQuery) {
            setFilteredData(adData);
            setSelectedCategoryName(`Results for: ${searchQuery}`);
        } else if (location.pathname == "/") {
            const filteredItems = adData.filter(item => item.is_available == 1);
            setFilteredData(filteredItems);
            setSelectedCategoryName('Today\'s Picks');
        } else if (location.pathname.includes('/MyListings')) {
            const filteredItems = adData.filter(item => item.user_id == userId);
            setFilteredData(filteredItems);
            setSelectedCategoryName('My Listings');
        } else {
            setFilteredData(adData);
        }
    }, [selectedCategory, adData, location.pathname, userId]);

    return (
        <div>
            <h2 className="container-title-category">{selectedCategoryName}</h2>
            <div className="item-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <ItemBlock key={index} item={item} isMyListings={isMyListings} />
                        ))
                    ) : (
                        <p>No ad data available for the selected category</p>
                    )
                )}
            </div>
        </div>
    );
}

export default AdContainer;