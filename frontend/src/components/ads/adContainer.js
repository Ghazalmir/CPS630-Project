import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adContainer.css';
import ItemBlock from './itemBlock.js';

function AdContainer() {
    const [adData, setAdData] = useState([]);
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

    return (
        <div className="item-container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                adData.length > 0 ? (
                    adData.map((item, index) => (
                        <ItemBlock key={item.product_id} price={item.price} title={item.title} location={item.location_id} />
                    ))
                ) : (
                    <p>No ad data available</p>
                )
            )}
        </div>
    );
}

export default AdContainer;