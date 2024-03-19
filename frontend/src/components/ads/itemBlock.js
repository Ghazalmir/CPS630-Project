import imageExample from './blacktshirt.png';
import React from 'react';

function itemBlock( {price, title, location} ) {

    { /* Remove these later and use variables above*/}
    return (
        <div style={{ width:'300px', fontFamily:'Poppins'}}>
            { /* Replace image url with user uploaded img to be determined later*/}
            <a href="#"><div className='imageHolder' style={{ width:'300px', height:'300px', backgroundImage:`url(${imageExample})`, backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F5F5F5'}}></div></a>
            <div className='pt-2'>
                <h6 style={{ color:'#004C9B', fontWeight:'bold'}}>${price}</h6>
                <a href="#" className="item-title" style={{ textDecoration:'none' }}><h5 style={{ color:'black', fontWeight:'bold'}}>{title}</h5></a>
                <h6 style={{color:'#80A5CD'}}>{location}</h6>
            </div>
        </div>
    );
}

export default itemBlock;