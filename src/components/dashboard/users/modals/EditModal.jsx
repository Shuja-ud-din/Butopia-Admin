import React, { useEffect, useState } from "react";
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

function EditModal({ modalIsOpen, closeModal, editUser,update }) {

  // console.log("edit user", editUser)


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");


  useEffect(()=>{
  setFirstName(editUser?.firstName)
  setLastName(editUser?.lastName)
  setBio(editUser?.bio)

  },[editUser])

  const value = {
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    id: editUser?._id,
  };

  const dispatch = useDispatch();

  const { loading,dataUserEdit,error } = useSelector((state) => state.editUser)

  console.log("data user edit", dataUserEdit)
  

  useEffect(() => {
    if (dataUserEdit && dataUserEdit.success) {
      console.log("data user edit inside", dataUserEdit);
      update(Math.random());
      closeModal();
    }
  }, [dataUserEdit]);
  

  const handleEditUser = async (e) => {
    e.preventDefault();
    dispatch(editUserThunk(value));
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit User Modal"
    >
      <form className="bg-white rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Edit User</h3>
        <div className="mb-4">
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none"
            // placeholder={editUser?.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none sm:text-sm"
            // placeholder={editUser?.lastName}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
            Decription
          </label>
          <input
            type="text"
            id="last-name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm outline-none sm:text-sm"
            // placeholder={editUser?.lastName}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>


        <div className="flex justify-between space-x-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleEditUser}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditModal;
