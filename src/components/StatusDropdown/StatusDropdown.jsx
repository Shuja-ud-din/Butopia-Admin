import { useState } from 'react';

const StatusDropdown = ({ initialValue, options, onChange, className }) => {
    const [isValid, setIsValid] = useState(initialValue === 'Valid');

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        const isValidValue = value === 'Valid';
        setIsValid(isValidValue);
        onChange(isValidValue);
    };

    return (
        <div className={`${className}`} >
            <label htmlFor="validationStatus" className="block  text-sm font-medium text-gray-700 w-full" >Validation Status</label>
            <select
                id="validationStatus"
                name="validationStatus"
                onChange={handleDropdownChange}
                value={isValid ? 'Valid' : 'Not Valid'}
                className="mt-1 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">Current Status: {isValid.toString()}</p>
        </div >
    );
};

export default StatusDropdown;
