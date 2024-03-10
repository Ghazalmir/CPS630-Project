import { useState } from "react";
import StatusFields from "../../components/adForm/statusField";

var files = [];
{/* 
This page is used for both making and editing an ad. 
The only difference between the two is that the edit page has the fields pre-filled, 
and also allows the user to delete an ad or change its status. 
*/}

function NewAdForm(props) {
    var defaultVals = {
      title: undefined, 
      price: 0, 
      description: undefined,
      category: 0,
      images: [],
      onCampus: false,
      street: undefined,
      city: undefined, 
      country: undefined,
      isAvailable: true,
    } 
  
  const [vals, setVals] = useState(props.vals || defaultVals);
  const [meetOnCampus, setMeetOnCampusChecked] = useState(vals.onCampus);


  return (
    <form className="m-5" action="/setAdDetails" method="post">
      {
        props.isEditForm == true ? <StatusFields status={vals.isAvailable}/> : ""
      }
      <h2>Item Information</h2>
      <div className="row">
        {/* Title */}
        <div className="col col-sm-6 col-12 mb-3">
          <label htmlFor="title" className="form-label">Title <span className="text-danger">*</span></label>
          <input type="text" id="title" placeholder="Title" required
                 className="form-control bg-body-tertiary" maxLength="100" 
                 defaultValue={vals.title} name="title"
                 />
        </div>
        {/* Price */}
        <div className="col col-sm-6 col-12 mb-3">
          <label htmlFor="price" className="form-label">Price <span className="text-danger">*</span></label>
          <div className="input-group">
          <span className="input-group-text">$</span>
          <input type="number" className="form-control bg-body-tertiary" name="price"
                 id="price" placeholder="Price" min="0" required defaultValue={vals.price}
                 />  
          </div>    
        </div>
      </div>
      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control bg-body-tertiary" id="description" 
                  placeholder="Lorem ipsum..." rows="3" name="description" defaultValue={vals.description}>
        </textarea>
      </div>
      {/* Category */}
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Categoy <span className="text-danger">*</span></label>
        <select id="category" className="form-select bg-body-tertiary" defaultValue={vals.category} name="category" required>
          <option value="0">Select a category</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      {/* File upload */}
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Images <span className="text-danger">*</span></label>
        <input onChange={(event) => {fileUpload(event);}}
                className="form-control bg-body-tertiary" type="file" id="formFile" 
                multiple="multiple" accept=".jpg,.png" required defaultValue={vals.images} name="images"/>
        <div id="selectedFiles" className="mt-3"></div>
      </div>
      <hr className="my-4"></hr>
      <h2>Meetup Information</h2>
      <p>Where do you want the transaction to happen?</p>
      {/* Address */}
      <div className="mb-3 form-check">
        <input className="form-check-input" type="checkbox" name="meetOnCampus" value={meetOnCampus} id="meet-on-campus" checked={meetOnCampus}
                onChange={() => {setMeetOnCampusChecked(!meetOnCampus)}
            }
        />
        <label className="form-check-label" htmlFor="meet-on-campus">
          Meet on TMU's Campus
        </label>
      </div>
      {
        meetOnCampus == true ? "": addressFields(vals.street, vals.city, vals.country) 
      }
      
      {/* Submit/cancel buttons */}
      <div className="text-end">
        <input className="btn btn-primary text-white rounded border-0 p-2 px-4" 
               type="submit" value={props.isEditForm == true ? "Update Ad" : "Post Ad"}/>
        <a type="button" href="/" className="btn p-2 px-4" >Cancel</a>
      </div>
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
export default NewAdForm;