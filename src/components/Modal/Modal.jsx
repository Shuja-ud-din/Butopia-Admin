import React from "react";

const Modal = ({ children, toggleModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 bg-[grey]" onClick={toggleModal}></div>
            <div className="fixed top-1/2 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg   left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
                <div className="bg-white shadow-md rounded-lg p-6">{children}</div>
            </div>
        </>
    );
};

export default Modal;
