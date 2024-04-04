import { useState, useEffect } from "react";
import axios from "axios";

function LocationField(props) {
	const [loading, setLoading] = useState(true);
  const [provincesData, setProvincesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(0);
  //const [selectedCity, setSelectedCity] = useState(0);

  useEffect(() => {
    
		const fetchProvinceData = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/locations/getProvinces`);
          console.log(response);
          setProvincesData(response.data);
          setLoading(false);
        
			} catch (error) {
				console.error("Error fetching province data:", error);
				setLoading(false);
			}
		};
	
		fetchProvinceData();
	}, []);

  useEffect(() => {
    
		const fetchCitiesData = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/locations/getCities`, {
            params: {
              province_id: selectedProvince,
            }
          });
          console.log(response);
          setCitiesData(response.data);
          setLoading(false);
        
			} catch (error) {
				console.error("Error fetching city data:", error);
				setLoading(false);
			}
		};
	
		fetchCitiesData();
	}, [selectedProvince]);
  

  return (
    <>
			{loading ? (
				<div>Loading...</div>
			) : (
      <div className="d-flex flex-row row mt-3">
        

        <div className="col col-12 col-md-6 mb-3">
        <label htmlFor="province" className="form-label">Province <span className="text-danger">*</span></label>
          <select className="form-select bg-body-tertiary" name="province" aria-label="Select a province" defaultValue={selectedProvince} onChange={($event)=> setSelectedProvince($event.target.value)} required>
          <option value="0">Select a province</option>
            {provincesData.map((province) => 
              (<option value={province.province_id} key={province.province_id}>{province.province_name}</option>))}
          </select>
        </div>
        <div className="col col-12 col-md-6 mb-3">
        <label htmlFor="location_id" className="form-label">City <span className="text-danger">*</span></label>

        <select className="form-select bg-body-tertiary" name="location_id" aria-label="Select a city" defaultValue={props.selectedCity} onChange={($event)=> props.changeSelectedCity($event.target.value)} disabled={citiesData.length > 0 ? false : true} required>
          <option value="0">{citiesData.length > 0 ? 'Select a city' : 'Select a province first'}</option>

          {citiesData.length > 0 ? 
            <>
            {citiesData.map((city) => 
            (<option value={city.location_id} key={city.location_id}>{city.city}</option>))}
            </>
          : <></>}
        </select>
        </div>
        

      </div>
      )}
    </>
    );
}

export default LocationField;