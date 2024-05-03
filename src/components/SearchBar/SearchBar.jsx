
import React from 'react';

const SearchBar = ({ placeholder, onChange }) => {
    return (
        <div className="relative max-w-xl">
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 absolute top-1/2 right-4 transform -translate-y-1/2"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M14.293 15.707a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414zM10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default SearchBar;
