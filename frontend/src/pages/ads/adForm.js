import { useState, useEffect, useRef } from "react";
import StatusFields from "../../components/adForm/statusField";
import DeleteConfirmationModal from "../../components/adForm/deleteConfirmationModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../userContext";

var files = [];
{/* 
This page is used for both making and editing an ad. 
The only difference between the two is that the edit page has the fields pre-filled, 
and also allows the user to delete an ad or change its status. 
*/}

function AdForm(props) {
  

  const [meetOnCampus, setMeetOnCampusChecked] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);
  const { id } = useParams();
  const { userId, setUserId } = useUser();

  // Form fields
  const title= useRef(undefined);
  const price = useRef(0);
  const description = useRef(undefined);
  const category_id = useRef(0);
  const images = useRef([]);
  //const [street, setStreet] = useState(undefined);
  //const [city, setCity] = useState(undefined);
  //const [country, setCountry] = useState(undefined);
  const [is_available, setAvailability] = useState(false);
  const [loading, setLoading] = useState(true);



    useEffect(() => {
      if (props.isEditForm) {
        const fetchAdData = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/api/ads/adDetails/${id}`, {
              params: {
                id: id
              }
            });            
            title.current.value = response.data.rows[0].title;
            description.current.value = response.data.rows[0].description;
            price.current.value = response.data.rows[0].price;
            category_id.current.value = response.data.rows[0].category_id;
            setAvailability(response.data.rows[0].is_available === "1" ? true : false);
            
            setMeetOnCampusChecked(response.data.rows[0].meet_on_campus);
            console.log(response.data.rows[0]);
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setLoading(false);
          }
        };
      
        fetchAdData();
      }
    }, [id]);

    const postAd = async() => {
      try {
        const response = await axios.post("http://localhost:8080/api/ads/postNewAd", {
          user_id: userId,
          location_id: 1, // TODO: FIX THIS LATER
          title: title.current.value,
          description: description.current.value,
          price: price.current.value, 
          category_id: category_id.current.value,
          // TODO: ADD SUB CATEGORY
          meet_on_campus: meetOnCampus === true ? 1 : 0,
          is_available: is_available === true ? 1 : 0,
        });
      } catch (error) {
        console.error("Error uploading post:", error);
      }
    }

    const updateAd = async() => {
      try {
        const response = await axios.post("http://localhost:8080/api/ads/updateAd", {
          product_id: id,
          values: {
            location_id: 1, // TODO: FIX THIS LATER
            title: title.current.value,
            description: description.current.value,
            price: price.current.value, 
            category_id: category_id.current.value,
            // TODO: ADD SUB CATEGORY
            meet_on_campus: meetOnCampus === true ? 1 : 0,
            is_available: is_available === true ? 1 : 0,
          }

        });
      } catch (error) {
        console.error("Error updating post:", error);
      }
    }

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/api/categories/sections")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }, []);

  if (loading)
    { return <p>Loading...</p> }


  return (
    <form className="m-5">
      {
        props.isEditForm == true ? <StatusFields status={is_available} change={() => setAvailability(!is_available)}/> : ""
      }
      <h2>Item Information</h2>
      <div className="row">
        {/* Title */}
        <div className="col col-sm-6 col-12 mb-3">
          <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
          <input type="text" id="title" placeholder="Title" required
                 className="form-control bg-body-tertiary" maxLength="100" 
                 ref={title} name="title"
                 />
        </div>
        {/* Price */}
        <div className="col col-sm-6 col-12 mb-3">
          <label htmlFor="price" className="form-label">Price <span className="text-danger">*</span></label>
          <div className="input-group">
          <span className="input-group-text">$</span>
          <input type="number" className="form-control bg-body-tertiary" name="price"
                 id="price" placeholder="Price" min="0" required ref={price}
                 />  
          </div>    
        </div>
      </div>
      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control bg-body-tertiary" id="description" 
                  placeholder="Lorem ipsum..." rows="3" name="description" ref={description}
                  >
        </textarea>
      </div>
      {/* Category */}
      <div className="mb-3">
        <label htmlFor="category_id" className="form-label">Category <span className="text-danger">*</span></label>
        <select id="category" className="form-select bg-body-tertiary" ref={category_id} 
                name="category_id" required
                >
          <option value="0">Select a category</option>
          {categories.map((category) => (<option value={category.category_id} key={category.category_id}>{category.category_name}</option>))}
        </select>
      </div>
      {/* File upload */}
      {/* TODO: ADD THE IMAGES */}
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Images <span className="text-danger">*</span></label>
        <input onChange={(event) => {fileUpload(event);}}
                className="form-control bg-body-tertiary" type="file" id="formFile" 
                multiple="multiple" accept=".jpg,.png" required name="images"/>
        <div id="selectedFiles" className="mt-3"></div>
      </div>
      <hr className="my-4"></hr>
      <h2>Meetup Information</h2>
      <p>Where do you want the transaction to happen?</p>
      {/* Address */}
      {/* TODO: ADD LOCATION */}
      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="meet_on_campus" value={meetOnCampus} id="meet-on-campus" checked={meetOnCampus}
                onChange={() => {setMeetOnCampusChecked(!meetOnCampus)}
            }
        />
        <label className="form-check-label" htmlFor="meet-on-campus">
          Meet on TMU's Campus
        </label>
      </div>
      {
        meetOnCampus === true ? "": addressFields(" ", " ", " ") 
      }
      
      {/* Submit/cancel buttons */}
      <div className="text-end pb-5">
          {props.isEditForm ? 
            <button className="btn btn-yellow rounded border-0 p-2 px-4 mx-1"
            onClick={($event) => {$event.preventDefault(); setIsDeleteModalShown(!isDeleteModalShown)}}
            >
              Delete Ad
            </button>
            : ""
          }

        <button className="btn btn-primary text-white rounded border-0 p-2 px-4 mx-1" 
               type="submit" onClick={props.isEditForm == true ? updateAd : postAd}>
                {props.isEditForm == true ? "Update Ad" : "Post Ad"}
        </button>
        <a type="button" href="/MyListings" className="btn p-2 px-4" >Cancel</a>
      </div>

      {/* Delete confirmation modal */}
      <DeleteConfirmationModal show={isDeleteModalShown} 
            id={props.id}
            onHide={() => setIsDeleteModalShown(false)}
            />
    </form>
  )
  }


  function addressFields(street, city, country) {
    return (
      <div>
        <div className="mb-3">
          <label htmlFor="street" className="form-label">Street Address</label>
          <input type="text" className="form-control bg-body-tertiary" id="street" 
                 placeholder="Street Adress" autoComplete="street-address" name="street"
                 defaultValue={street}
                 />
        </div>
        <div className="row">
          <div className="col col-sm-6 col-12 mb-3">
            <label htmlFor="city" className="form-label">City <span className="text-danger">*</span></label>
            <input type="text" className="form-control bg-body-tertiary" id="city" 
                   placeholder="City" autoComplete="address-level2" required 
                   name="city" defaultValue={city}
                   />
          </div>
          <div className="col col-sm-6 col-12 mb-3">
            <label htmlFor="country" className="form-label">Country <span className="text-danger">*</span></label>
            <input type="text" className="form-control bg-body-tertiary" id="country" 
            placeholder="Country" autoComplete="country" required name="country" defaultValue={country}/>
          </div>
      </div>
      </div>
    );
    
  }


  function fileUpload(event) {
    if(!event.target.files || !window.FileReader) return;
    let selDiv = document.querySelector("#selectedFiles");
    selDiv.innerHTML = "";
    
    //var files = ;
    var filesArr = Array.prototype.slice.call(event.target.files);
    files.push(...filesArr);
    files.forEach(function(f) {
      if(!f.type.match("image.*")) {
        return;
      }
  
      var reader = new FileReader();
      reader.onload = function (event) {
        var html = "<img style='max-height:100px;' class='mt-3' src=\"" + event.target.result + "\">" +"   " + f.name + "<br clear=\"left\"/>";
        selDiv.innerHTML += html;				
      }
      reader.readAsDataURL(f); 
    });
  }

export default AdForm;