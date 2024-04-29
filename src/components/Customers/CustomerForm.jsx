import React, { useState } from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';
// import uploadImg from '../../assets/images/upload-img.png';
const CustomerForm = () => {
    const [imagePreview, setImagePreview] = useState("");
    return (
        <>
            <div className="w-full">
                <h3 className="text-[25px] font-[500] ">Add Customers</h3>
            </div>
            <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
                <form className="p-7">
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
                        <div className="flex justify-center items-center flex-col">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <div className="w-[350px] h-[300px] mb-4 flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Plant"
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <img
                                            // src="/placeholder"
                                            // alt="placeholder"
                                            className="w-18 h-18"
                                        />
                                    )}
                                </div>
                                <input
                                    id="image-upload"
                                    name="image"
                                    type="file"
                                    className="hidden"
                                />
                            </label>
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
                                    type='text'
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
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="harvestingPeriod"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Address
                                </label>
                                <Input
                                    type='text'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Additional Comments
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>




                    <div className="mt-8">
                        <Button className='w-40' type='primary' outlined="true">   Save Customer</Button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default CustomerForm