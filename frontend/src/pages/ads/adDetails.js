import Carousel from "../../components/carousel/carousel";
import BlueButton from "../../components/general/blueButton";
import AvailabilityStatus from "../../components/general/availabilityStatus";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

function AdDetails() {
  const { id } = useParams();
  const [adData, setAdData] = useState();
	const [loading, setLoading] = useState(true);

  useEffect(() => {
		const fetchAdData = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/ads/adDetails/${id}`, {
          params: {
            id: id
          }
        });
				setAdData(response.data.rows[0]);
				//setInitialUserData(response.data[0])
				console.log(response.data.rows[0]);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setLoading(false);
			}
		};
	
		fetchAdData();
	}, [id]);

  return (
    <>
			{loading ? (
				<div>Loading...</div>
			) : (
    <div className="mx-5">
      <div className="row align-items-around my-5">
        <span className="col"> 
          <span className="text-muted">Category / </span>
          <span className="fw-bolder">Subcategory</span>
        </span>
        <span className="col text-end">Back</span>
      </div>
      <div className="container text-center mt-5">
        <div className="row align-items-around">
          <div className="col col-12 col-sm-6">
          <Carousel 
            items={[
              {img: '../../logo512.png', alt: 'logo1', id: 1},
              {img: '../../logo512.png', alt: 'logo2', id: 2},
              {img: '../../logo512.png', alt: 'logo3', id: 3},
            ]
            }
          
          />
          </div>
          <div className="col col-12 col-sm-6 text-start">
            <h2 className="col col-12 col-sm-6 inline-block">
              {adData.title}
              <AvailabilityStatus available={adData.is_available === "1"}/>

            </h2>
            <h6 className="text-blue">Location</h6>
            <h4 className="fw-normal">{adData.price}</h4>
            <p>{adData.description}</p>
            <BlueButton href={`/Messages/${id}`} text="Message Seller" />
          </div>
        </div>
      </div>
    </div>
    )}
		</>
  );
}

export default AdDetails;