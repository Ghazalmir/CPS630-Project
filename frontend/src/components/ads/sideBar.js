import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./adContainer.css";

function SideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Placeholder
    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="container d-flex justify-content-center pt-5 side-bar">
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index}>
            {category.subCategories ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id={`dropdown-${category.id}`}
                  className="sidebar-dropdown category"
                >
                  {category.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {category.subCategories.map((subCategory, subIndex) => (
                    <Dropdown.Item
                      key={subIndex}
                      as={Link}
                      to={`/${subCategory.link}`}
                    >
                      {subCategory.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Link
                className="btn align-items-center category"
                to={`/${category.link}`}
              >
                {category.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
