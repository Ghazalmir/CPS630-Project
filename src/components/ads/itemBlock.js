import imageExample from './blacktshirt.jpg';
import React from 'react';

function itemBlock( {price, title, location} ) {

    { /* Remove these later and use variables above*/}
    return (
        <div style={{ width:'270px', fontFamily:'Poppins'}}>
            { /* Replace image url with user uploaded img to be determined later*/}
            <div className='imageHolder' style={{ width:'270px', height:'270px', backgroundImage:`url(${imageExample})`, backgroundSize:'cover', backgroundPosition:'center', backgroundColor:'#F5F5F5'}}>
            </div>
            <div className='pt-2'>
                <h6 className='text-blue'>${price}</h6>
                <h5 className='fw-bold'>{title}</h5>
                <h6 style={{color:'#80A5CD'}}>{location}</h6>
            </div>
        </div>
    );
}

export default itemBlock;