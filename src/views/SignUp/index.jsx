import React from 'react'
import mainLogo from '../../assets/logos/main-logo.jpg';
const SignUp = () => {
  return (
    <React.Fragment>
      <div className="w-full h-screen flex items-center justify-center bg-gray-200" >
        <form className="bg-gray-200 p-6 rounded-lg shadow-md shadow-lg-top  w-2/6 h-120 rounded-lg">
          <div className='w-full flex items-center justify-center'><img src={mainLogo} alt="" className='h-16 w-16' /></div>
          <h3 className="text-xl font-light mt-3">Sign Up</h3>
          <p className='text-xs text-gray-400  mb-3 font-light mt-3'>Enter your personal detail below:</p>
          <div className="mb-4">
            <input placeholder='Full Name' name="name" className="border rounded border-gray-300   p-2 w-full" type="text" />
          </div>
          <div className="mb-4">
            <input placeholder='User Name' name="userName" className="border rounded border-gray-300   p-2 w-full" type="text" />
          </div>
          <div className="mb-4">
            <input placeholder='Email Address' name="email" className="border rounded border-gray-300   p-2 w-full" type="email" />
          </div>
          <div className="mb-4">
            <input placeholder='Password' name="password" className="border rounded border-gray-300   p-2 w-full" type="password" />
          </div>
          <div className="mb-4">
            <input placeholder='Re-type Your Password' name="confirmPassword" className="border rounded border-gray-300   p-2 w-full" type="password" />
          </div>

          <h5 className="text-red-500">
            {/* {error} */}
          </h5>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" name="check" className="form-checkbox h-4 w-4 text-gray-600" />
              <label className="ml-2 text-gray-700 text-xs" htmlFor="remember-me">I agree to the Terms of Service Privacy Policy
              </label>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <button className="mt-2 w-3rem bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg" type="submit">Back</button>
            <button className='mt-2 w-3rem bg-secondary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'>Submit</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default SignUp