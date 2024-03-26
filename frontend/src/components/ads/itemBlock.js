import imageExample from './blacktshirt.png';
import React from 'react';
import { Link } from 'react-router-dom';

function itemBlock( {id, price, title, location} ) {

    const handleClick = () => {
        window.location.href =`/adDetails/${id}`;
    };

    return (
        <div style={{ width:'300px', fontFamily:'Poppins'}}>
            { /* Replace image url with user uploaded img to be determined later*/}
            <a href="#"><div className='imageHolder' style={{ width:'300px', height:'300px', backgroundImage:`url(${imageExample})`, backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F5F5F5'}} onClick={handleClick}></div></a>
            <div className='pt-2'>
                <h6 style={{ color:'#004C9B', fontWeight:'bold'}}>${price}</h6>
                <a href="#" className="item-title" style={{ textDecoration:'none' }}><h5 style={{ color:'black', fontWeight:'bold'}} onClick={handleClick}>{title}</h5></a>
                <h6 style={{color:'#80A5CD'}}>{location}</h6>
            </div>
        </div>
    );
}

export default itemBlock;