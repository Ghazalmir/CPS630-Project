import imageExample from './blacktshirt.png';
import React from 'react';
import AvailabilityStatus from "../../components/general/availabilityStatus";
import { Link, useLocation } from 'react-router-dom';

function ItemBlock({ item, isMyListings }) {
    const location = useLocation();

    const handleClick = () => {
        window.location.href = `/adDetails/${item.product_id}`;
    };

    const handleEditClick = () => {
        window.location.href = `/EditAd/${item.product_id}`;
    };

    const handleDeleteClick = () => {

    };

    return (
        <div style={{ width: '300px', fontFamily: 'Poppins', position: 'relative' }}>
            {/* Conditionally render edit button for MyListings page */}
            {/* Image and item details */}
            <a>
                <div className='imageHolder' style={{ width: '300px', height: '300px', maxWidth: '100%', maxHeight: '100%', backgroundImage: `url(${imageExample})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F5F5F5', cursor: 'pointer' }}>
                <img src={imageExample} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover'}} onClick={handleClick}/>
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
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <h6 style={{ color: '#004C9B', fontWeight: 'bold', margin: '0' }}>${item.price}</h6>
                    {isMyListings && (
                        <>
                        <AvailabilityStatus available={item.is_available === "1"}/>
                        </>                    
                )}
                </div>
                <a href="#" className="item-title" style={{ textDecoration: 'none' }}><h5 style={{ color: 'black', fontWeight: 'bold' }} onClick={handleClick}>{item.title}</h5></a>
                <h6 style={{ color: '#80A5CD' }}>{item.location_id}</h6>
            </div>
        </div>
    );
}

export default ItemBlock;