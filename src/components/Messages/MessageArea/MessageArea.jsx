import React from 'react';

const MessageArea = ({ children }) => {
    return (
        <div className='p-[1rem] position-relative flex-grow h-[27rem] w-full flex flex-col-reverse overflow-y-auto'>
            {children.slice(0).reverse()}
        </div>
    );
}

export default MessageArea;
