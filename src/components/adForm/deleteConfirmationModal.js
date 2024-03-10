import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import  { useNavigate } from 'react-router-dom'

function DeleteConfirmationModal(props) {
  const navigate = useNavigate();
  const handleDelete = async (event) => {
    //event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`/deleteAd?id=${props.id}`, {
        method: 'get',
      });
  
      if (response.ok) {
        console.log('Ad deleted successfully');
        
        navigate("/profile", { state: { message: "Ad deleted successfully!" } });
      } else {
        console.error('Failed to delete ad');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
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
      <h4>Are you sure you want to delete this ad? </h4>
      <p>
        This action cannot be undone. 
      </p>
    </Modal.Body>
    <Modal.Footer>
          <button className="btn" onClick={props.onHide}>
            Close
          </button>
          <button className="btn btn-yellow" onClick={handleDelete}>
            Delete Ad
          </button>
        </Modal.Footer>
  </Modal>
  );
}

export default DeleteConfirmationModal;

