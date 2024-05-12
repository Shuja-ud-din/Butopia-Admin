import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';
import ImageUploader from '../ImageUploader/ImageUploader';
import useCustomer from '../../Hooks/useCustomer';
import ButtonLoader from '../ButtonLoader/ButtonLoader';
const CustomerForm = () => {
    const { addCustomerData, handleChange, addCustomer, loading, } = useCustomer();
    console.log(addCustomerData);
    return (
        <>
            <div className="w-full">
                <h3 className="text-[25px] font-[500] ">Add Customers</h3>
            </div>
            <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
                <form onSubmit={addCustomer} className="p-7">
                    <div className="flex justify-between">
                        <p className="font-semibold">Image of customer</p>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Customer Detail
                        </button>
                    </div>

                    <div className="flex gap-28 mt-10 w-full">
                        <div>
                            <div className="flex justify-center items-center flex-col mb-5">
                                <ImageUploader />
                            </div>
                            {/* <label htmlFor="file-upload" className="p-2 rounded-[9px]  border border-[#c4c4c4] shadow-md overflow-hidden">
                                Upload your file
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={(e) => {
                                        const fileName = e.target.files[0].name;
                                        document.getElementById("file-name").innerText = fileName;
                                    }}
                                />
                            </label>
                            <div id="file-name" className='mt-4'></div> */}
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <Input
                                    type='text'
                                    name={"name"}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="plantingPeriod"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <Input
                                    type='text'
                                    name={"email"}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="scientificName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </label>
                                <Input
                                    name={"phoneNumber"}
                                    type='text'
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="harvestingPeriod"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <Input
                                    name={"password"}
                                    type='text'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>





                    <div className="w-full flex justify-end mt-8">
                        <Button onClick={addCustomer} className='w-40' type='primary'> {loading ? <ButtonLoader /> : "Add Customer"}</Button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default CustomerForm