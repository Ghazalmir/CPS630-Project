import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import  { useNavigate, useLocation } from 'react-router-dom'

function DeleteConfirmationModal(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPanel = location.pathname.includes("Users");
  const handleDelete = async () => {
    //event.preventDefault(); // Prevent default form submission
    try {
      if (isAdminPanel) {
        fetch("http://localhost:8080/api/admin/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: props.id}),
        })
      .then(() => {
        navigate(window.location);
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting user :", error));
      } else {
        fetch("http://localhost:8080/api/ads/deleteAd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({product_id: props.id}),
      })
      .then(() => {
        navigate("/MyListings");
        window.location.reload();
      })
      .catch((error) => console.error("Error deleting post :", error));
      }
        
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Confirm Deletion
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Are you sure you want to delete this {isAdminPanel ? 'user' : 'ad'}? </h4>
      <p>
        This action cannot be undone. 
      </p>
    </Modal.Body>
    <Modal.Footer>
          <button className="btn" onClick={props.onHide}>
            Close
          </button>
          <button className="btn btn-yellow" onClick={handleDelete}>
            Delete {isAdminPanel ? 'User' : 'Ad'}
          </button>
        </Modal.Footer>
  </Modal>
  );
}

export default DeleteConfirmationModal;

