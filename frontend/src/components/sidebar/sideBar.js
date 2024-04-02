import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./sideBar.css";
import Filters from './filters';
import { useLocation } from 'react-router-dom';


function SideBar() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8080/api/categories/sections")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/categories/sections/subcategories")
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const checkSubCategory = (category) => {
    return subCategories.some(subCategory => subCategory.category_id === category.category_id);
  };

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <div className="container d-flex justify-content-center pt-5 side-bar">
      <ul className="list-unstyled">
        <div className="categories-container"> 
        {categories.map((category, index) => (
          <li key={index}>
            {checkSubCategory(category) ? (
                 <React.Fragment>
                 <button className="collapsible-button" onClick={toggleCollapse}>
                   {category.category_name}
                 </button>
                 {subCategories
                   .filter(subCategory => subCategory.category_id === category.category_id)
                   .map((subCategory, subIndex) => (
                     <div className={`collapsible-content d-${isCollapsed ? 'none' : 'block'}`} key={subIndex} onClick={refreshPage}>
                      <Link
                        className="btn align-items-center subcategory"
                        to={{search: `?searchQuery=${subCategory.subcategory_name}`}}>
                        <span> {'>'} </span>{subCategory.subcategory_name}
                      </Link>
                     </div>
                   ))}
               </React.Fragment>
            ) : (
              <Link
                className="btn align-items-center category"
                to={{
                  search: `selectedCategory=${category.category_id}&categoryName=${category.category_name}`,
                }}>
               {category.category_name}
          </Link>
            )}
          </li>
        ))}
        </div>
        <Filters />
      </ul>
    </div>
  );
}

export default SideBar;
