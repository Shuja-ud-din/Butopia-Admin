import React from 'react'

const AppointmentForm = () => {
    return (
        <>
            <div className="w-full">
                <h3 className="text-[25px] font-[500] ">Add Appoinment</h3>
            </div>
            <div className="mt-12 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Add Appointment</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" className="mt-1 block w-full  rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
                        <input type="date" id="date" name="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                    </div>
                    <div>
                        <label htmlFor="time" className="block font-medium text-gray-700">Time</label>
                        <input type="time" id="time" name="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-primary text-light font-semibold py-2 px-4 rounded-lg hover:bg-opacity-80">Submit</button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default AppointmentForm