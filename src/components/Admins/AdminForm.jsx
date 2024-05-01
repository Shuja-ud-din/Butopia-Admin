import React from 'react'
import profileImg from '../../assets/images/clientAvatar.png'
import Button from '../Button/Button'
const AdminForm = () => {
    return (
        <>
            <div className="p-3 bg-white rounded-[1rem] shadow-lg border border-gray-300">
                {/* Content goes here */}
                <div className="text-gray-600 body-font relative">
                    <div className="px-2 py-15 mx-auto">
                        <div className="flex flex-col text-center w-full mb-8">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                                Admin Details
                            </h1>
                            <div className="flex justify-center items-center">
                                <img
                                    alt="Remy Sharp"
                                    src={profileImg}
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Enter your name"
                                            className="w-full bg-red-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>

                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="role" className="leading-7 text-sm text-gray-600">
                                            Role
                                        </label>
                                        <select
                                            id="role"
                                            name="role"
                                            className="w-full bg-red-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                                            Phone No
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter yourEnter your phone number"
                                            className=' class="w-full bg-red-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"'
                                        />
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full bg-red-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 w-full flex justify-center">
                                <div className="relative w-full max-w-md">
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                    <div className="flex items-center border border-gray-300 rounded bg-red-100 bg-opacity-50">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="w-full py-1 px-3 leading-8 text-base text-gray-700 bg-transparent outline-none"
                                        />
                                        <button id="togglePassword" type="button" className="mr-2 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-600">
                                                <path fillRule="evenodd" d="M12 6.5C7.857 6.5 4.5 9.857 4.5 14c0 .905.29 1.738.784 2.415l1.532-1.532c-.036-.109-.065-.22-.065-.338 0-.894.722-1.616 1.616-1.616.118 0 .229.029.338.065l1.532-1.532c-.677-.494-1.51-.784-2.415-.784-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5c0-.118-.029-.229-.065-.338l1.532-1.532c.036-.109.065-.22.065-.338 0-.894-.722-1.616-1.616-1.616-.118 0-.229.029-.338.065l-1.532 1.532C13.738 18.71 14.571 19 15.5 19c4.143 0 7.5-3.357 7.5-7.5S19.143 4.5 15 4.5zM12 8c1.93 0 3.5 1.57 3.5 3.5S13.93 15 12 15s-3.5-1.57-3.5-3.5S10.07 8 12 8z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 w-full flex justify-center">
                                <Button outlined className="">
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminForm