import './Navbar.css'
import { ReactComponent as SearchIcon } from '../Other/icons8-search.svg';

function LoggedOutNavBar() {
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Website Name</a>
          <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">My Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Create New Ad</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Messages</a>
              </li>
            </ul>
            <form className="d-flex search-form" role="search">
              <div className="search-bar-container">
                <input className="form-control me-2" type="search" placeholder="What are you looking for?" aria-label="Search" />
                <button className="btn btn-outline-light search-icon" type="button">
                  <SearchIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
  
  export default LoggedOutNavBar;