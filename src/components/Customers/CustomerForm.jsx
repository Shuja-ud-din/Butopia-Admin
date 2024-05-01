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
                        <div>
                            <div className="flex justify-center items-center flex-col mb-5">
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="w-[350px] h-[300px] mb-4 flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
                                        {imagePreview ? (
                                            <img
                                                src={imagePreview}
                                                alt=""
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
                            <label htmlFor="file-upload" className="p-2 rounded-[9px]  border border-[#c4c4c4] shadow-md overflow-hidden">
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
                            <div id="file-name" className='mt-4'></div>
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





                    <div className="w-full flex justify-end mt-8">
                        <Button className='w-40' type='primary' outlined="true">   Save Customer</Button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default CustomerForm