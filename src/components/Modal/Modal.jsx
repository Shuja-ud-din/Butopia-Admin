import React from "react";

const Modal = ({ children, toggleModal }) => {
    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 bg-gray-300" onClick={toggleModal}></div>
            <div className="overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full md:max-w-md h-full md:max-h-screen overflow-hidden pr-4">
                <div className="w-full max-h-screen overflow-y-auto pr-4">{children}</div>
            </div>
        </>
    );
};

export default Modal;
