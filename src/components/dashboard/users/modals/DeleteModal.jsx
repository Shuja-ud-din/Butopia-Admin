import axios from "axios";
import React from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../../store/thunks";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function DeleteModal({modalIsOpen,closeModal,id}) {

  
  const dispatch = useDispatch();

  const handleDelete =async ()=>{

    dispatch(deleteUser(id))
      closeModal()
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col justify-center items-center">
          <div>
            <div className="flex justify-center">
              <img src="pastry.svg" className="h-40" alt="Pastry" />
            </div>
            <p className="p-4">Are you sure you want to delete this user?</p>
          </div>

          <div className="flex gap-4">
            <button className="bg-[green] text-[white] px-4 py-2 rounded focus:outline-none focus:shadow-outline-blue"
              onClick={handleDelete}
            >
              Confirm
            </button>
            <button onClick={closeModal} className="bg-[gray] text-[white] px-4 py-2 rounded focus:outline-none focus:shadow-outline-gray">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;
