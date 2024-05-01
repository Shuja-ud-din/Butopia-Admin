import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { editUserThunk } from "../../../../store/thunks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    maxWidth: "500px",
    width: "90%",
  },
};

const EditModal = ({ modalIsOpen, closeModal, children }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById("root")}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit User Modal"
    >
      {children}
    </Modal>
  );
};

export default EditModal;
