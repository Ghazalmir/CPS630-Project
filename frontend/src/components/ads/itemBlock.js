import imageExample from './blacktshirt.png';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ItemBlock({ id, price, title, locationId, isMyListings }) {
    const location = useLocation();

    const handleClick = () => {
        window.location.href = `/adDetails/${id}`;
    };

    const handleEditClick = () => {
        window.location.href = `/EditAd/${id}`;
    };

    const handleDeleteClick = () => {

    };

    return (
        <div style={{ width: '300px', fontFamily: 'Poppins', position: 'relative' }}>
            {/* Conditionally render edit button for MyListings page */}
            {/* Image and item details */}
            <a>
                <div className='imageHolder' style={{ width: '300px', height: '300px', maxWidth: '100%', maxHeight: '100%', backgroundImage: `url(${imageExample})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F5F5F5', cursor: 'pointer' }}>
                <img src={imageExample} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover'}} onClick={handleClick}/>
                {isMyListings && (
                    <>
                    <div className="button-container" style ={{ position: 'absolute', top: '10px', right: '5px'}}>
                        <button className="edit-button" onClick={handleEditClick} style={{backgroundColor: '#004c9b', marginRight: '10px', padding: '5px 15px', borderRadius: '5px', color: 'white'}}>Edit</button>
                        <button className="delete-button" onClick={handleDeleteClick} style={{backgroundColor: '#ffdc00', marginRight: '5px', padding: '5px 15px', borderRadius: '5px'}}>Delete</button>
                    </div>
                    </>                    
            )}
                </div>
            </a>
            <div className='pt-2'>
                <h6 style={{ color: '#004C9B', fontWeight: 'bold' }}>${price}</h6>
                <a href="#" className="item-title" style={{ textDecoration: 'none' }}><h5 style={{ color: 'black', fontWeight: 'bold' }} onClick={handleClick}>{title}</h5></a>
                <h6 style={{ color: '#80A5CD' }}>{locationId}</h6>
            </div>
        </div>
    );
}

export default ItemBlock;