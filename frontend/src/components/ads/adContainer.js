import React, { useState, useEffect } from 'react';
import { useUser } from "../../userContext";
import axios from 'axios';
import './adContainer.css';
import ItemBlock from './itemBlock.js';
import { useLocation } from 'react-router-dom';

function AdContainer({}) {
    const { userId, setUserId } = useUser();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('selectedCategory');
    const categoryName = searchParams.get('categoryName');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [adData, setAdData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const isMyListings = location.pathname.includes('/MyListings');
    
    useEffect(() => {
        const fetchAdData = async () => {
            try {
                let apiUrl = 'http://localhost:8080/api/ads/products';
                const response = await axios.get(apiUrl);
                setAdData(response.data.rows);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ad data:', error);
                setLoading(false);
            }
        };

        fetchAdData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const filteredItems = adData.filter(item => item.category_id === selectedCategory);
            setFilteredData(filteredItems);
            setSelectedCategoryName(categoryName);
        } else {
            setFilteredData(adData); 
            setSelectedCategoryName('Today\'s Picks')
        }

        
    }, [selectedCategory, adData]);

    useEffect(() => {
        if (location.pathname === "/") {
            const userItems = adData.filter(item => item.is_available == 1);
            setFilteredData(userItems);
            setSelectedCategoryName('Today\'s Picks');
            console.log(userItems);
        }
    }, [adData]);


    useEffect(() => {
        const pathname = location.pathname;
        if (pathname.includes('/MyListings')) {
            const userItems = adData.filter(item => item.user_id === userId);
            setFilteredData(userItems);
            setSelectedCategoryName('My Listings');
            console.log(userItems);

        }
    }, [location.pathname, userId, adData]);

    return (
        <div>
            <h2 className="container-title-category">{selectedCategoryName}</h2>
            <div className="item-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <ItemBlock key={index} id={item.product_id} price={item.price} title={item.title} location={item.location_id} isMyListings={isMyListings} />
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