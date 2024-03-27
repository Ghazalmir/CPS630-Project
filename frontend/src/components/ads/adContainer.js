import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adContainer.css';
import ItemBlock from './itemBlock.js';
import { useLocation } from 'react-router-dom';

function AdContainer() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedCategory = searchParams.get('selectedCategory');
    const categoryName = searchParams.get('categoryName');
    const [selectedCategoryName, setSelectedCategoryName] = useState('');

    const [adData, setAdData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/ads/adProducts');
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

    return (
        <div>
            <h2 className="container-title-category">{selectedCategoryName}</h2>
            <div className="item-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <ItemBlock key={index} id={item.product_id} price={item.price} title={item.title} location={item.location_id} />
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