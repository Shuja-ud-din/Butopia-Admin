import React, { useState } from 'react'
import Input from '../../Input/Input'
import Button from '../../Button/Button';
import ServiceDropDown from '../../SelectDropdown/ServiceDropDownSelect'
import AdminTable from './AdminTable'

const ProvidersForm = () => {
    const [imagePreview, setImagePreview] = useState("");
    return (
        <>
            <div className="w-full">
                <h3 className="text-[25px] font-[500] ">Add Providers</h3>
            </div>
            <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
                <form className="p-7">
                    <div className="flex justify-between">
                        <p className="font-semibold">Provider Details</p>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload Profile Photo
                        </button>
                    </div>

                    <div className="flex gap-[5rem] mt-10 w-full">

                        <div className="w-full">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Provider Name
                                </label>
                                <Input
                                    type='text'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <Input
                                    type='text'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Speciality
                                </label>
                                <Input
                                    type='text'
                                />
                            </div>



                            <label
                                htmlFor="description"
                                className="mt-12 block text-sm font-medium text-gray-700 min-w-[22rem]"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={4}
                                className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="w-full mb-8 mt-8 flex justify-start">
                                <Button className='w-40' type='primary' outlined="true">   Save Provider</Button>
                            </div>

                        </div>
                        <div className='w-full mt-[4rem] '>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mt-3"
                            >
                                Availability
                            </label>
                            <Input
                                type='text'
                            />
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mt-3"
                            >
                                Phone Number
                            </label>
                            <Input
                                type='text'
                            />
                        </div>

                        <div class="h-[28rem] m-0 w-[1px] bg-[black]"></div>
                        <div className="w-full h-full flex items-center  flex-col ">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <div className="w-[350px] h-[300px] mb-4 mt-12 flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden ">
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
                    </div>

                    <div className='mt-[4rem]'><AdminTable /></div>
                </form>
            </div>
        </>
    )
}

export default ProvidersForm