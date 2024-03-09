import React from 'react';
import './adContainer.css'
import ItemBlock from './itemBlock.js';

function adContainer() {
    const data = [
        { price: '200', title: 'Black T-Shirt', location: 'Toronto, ON' },
        { price: '300', title: 'Blue Jeans', location: 'New York, NY' },
        { price: '150', title: 'White Sneakers', location: 'Los Angeles, CA' },
        { price: '120', title: 'Striped Shirt', location: 'Chicago, IL' },
        { price: '250', title: 'Leather Jacket', location: 'San Francisco, CA' },
        { price: '180', title: 'Denim Shorts', location: 'Miami, FL' },
        { price: '220', title: 'Hoodie', location: 'Seattle, WA' },
        { price: '280', title: 'Athletic Shoes', location: 'Boston, MA' },
        // Add more items as needed
    ];

    const item ={ price: '200', title: 'Black T-Shirt', location: 'Toronto, ON' };

    return (
        <div className="item-container">
            {data.map((item, index) => (
                <ItemBlock price={item.price} title={item.title} location={item.location} />
            ))} 
        </div>
    );
}


export default adContainer;