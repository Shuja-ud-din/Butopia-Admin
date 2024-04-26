import React, { useState } from 'react'
import mainLogo from '../../assets/logos/main-logo.jpg';

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        check: "",
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({
            ...loginData,
            [name]: value,
        })

    }
    console.log(loginData);
    const handleSubmitLogin = () => {
        //submit login data
    }
    return (

        <React.Fragment>
            <div className="w-full h-screen flex items-center justify-center bg-gray-200" >
                <form onSubmit={handleSubmitLogin} className="bg-gray-200 p-6 rounded-lg shadow-md w-2/6 h-120 rounded-lg">
                    <div className='w-full flex items-center justify-center'><img src={mainLogo} alt="" className='h-16 w-16' /></div>
                    <h3 className="text-xl font-light mt-3">Personal Information</h3>
                    <p className='text-xs text-gray-400  mb-3 font-light mt-3'>Enter your e-mail address and your password.</p>
                    <div className="mb-4">
                        <input placeholder='admin@gmail.com' onChange={handleChange} name="email" className="border rounded border-gray-300   p-2 w-full" type="email" />
                    </div>
                    <div className="mb-4">
                        <input placeholder='password' onChange={handleChange} name="password" className="border rounded border-gray-300   p-2 w-full" type="email" />
                    </div>

                    <h5 className="text-red-500">
                        {/* {error} */}
                    </h5>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" name="check" onChange={handleChange} className="form-checkbox h-4 w-4 text-gray-600" />
                            <label className="ml-2 text-gray-700 text-xs" htmlFor="remember-me">Remember me</label>
                        </div>
                        <button className="text-xs text-blue-500 text-primary" type="button">Forget Password?</button>
                    </div>
                    <button className="mt-2 w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg" type="submit">Sign Me In</button>
                    <button className='mt-2 w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'>Create an account</button>
                </form>
            </div>

        </React.Fragment>
    )
}

export default Login
{/* <svg
    xmlns="http://www.w3.org/2000/svg"
    width="410"
    height="201"
    viewBox="0 0 410 201"
    className="w-64 h-32"
>
    <path
        fill="primary"
        d="M1000 1680 c-270 -39 -507 -262 -556 -524 -30 -156 -10 -339 50 -453
73 -137 122 -194 230 -268 127 -87 226 -117 382 -117 127 0 170 10 294 71
36 17 142 85 235 151 94 66 178 120 189 120 15 0 88 -56 181 -139 75 -67
242 -162 350 -199 118 -40 136 -38 93 10 -93 101 -156 178 -224 272 -113 154
-117 160 -139 192 -31 46 -131 185 -167 233 -18 24 -37 52 -43 62 -35 61 -236
330 -288 385 -88 94 -185 158 -285 187 -64 19 -227 29 -302 17z m236 -301 c31
-12 73 -32 93 -46 42 -28 115 -111 162 -183 18 -27 36 -50 41 -50 4 0 8 -6 8
-14 0 -7 6 -19 14 -25 15 -13 96 -142 96 -154 0 -6 -106 -87 -257 -193 -108
-78 -201 -114 -292 -114 -73 0 -183 39 -245 86 -112 85 -166 224 -147 376 19
148 102 250 261 321 54 24 195 22 266 -4z"
    />
</svg> */}