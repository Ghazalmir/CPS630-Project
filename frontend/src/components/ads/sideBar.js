import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./adContainer.css";

function SideBar() {
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

  useEffect(() => {
    fetch("http://localhost:8080/api/categories/sections/subcategories")
      .then((response) => response.json())
      .then((data) => {
        setSubCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const checkSubCategory = (category) => {
    return subCategories.some(subCategory => subCategory.category_id === category.category_id);
  };

  return (
    <div className="container d-flex justify-content-center pt-5 side-bar">
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index}>
            {checkSubCategory(category) ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id={`dropdown-${category.id}`}
                  className="sidebar-dropdown category">
                  {category.category_name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {subCategories
                    .filter(subCategory => subCategory.category_id === category.category_id)
                    .map((subCategory, subIndex) => (
                      <Dropdown.Item
                        key={subIndex}
                        as={Link}
                        to={`/${subCategory.link}`}
                      >
                        {subCategory.subcategory_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                className="btn align-items-center category"
                to={`/${category.link}`}
              >
                {category.category_name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
