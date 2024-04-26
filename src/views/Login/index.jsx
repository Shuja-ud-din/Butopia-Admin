import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    check: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    navigate("/admin/appointments");
  };

  return (
    <React.Fragment>
      <div className="w-full h-screen flex items-center justify-center bg-gray-200">
        <form
          onSubmit={handleSubmitLogin}
          className="bg-gray-200 p-6 rounded-lg  shadow-md w-96 h-96 rounded-lg"
        >
          <h3 className="text-xl   font-light m-0">Personal Information</h3>
          <p className="text-xs text-gray-400  mb-3 font-light mt-3">
            Enter your e-mail address and your password.
          </p>
          <div className="mb-4">
            <input
              placeholder="admin@gmail.com"
              onChange={handleChange}
              name="email"
              className="border rounded border-gray-300   p-2 w-full"
              type="email"
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="password"
              onChange={handleChange}
              name="password"
              className="border rounded border-gray-300   p-2 w-full"
              type="email"
            />
          </div>

          <h5 className="text-red-500">{/* {error} */}</h5>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="check"
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-gray-600"
              />
              <label
                className="ml-2 text-gray-700 text-xs"
                htmlFor="remember-me"
              >
                Remember me
              </label>
            </div>
            <button
              className="text-xs text-blue-500 text-primary"
              type="button"
            >
              Forget Password?
            </button>
          </div>
          <button
            className="mt-2 w-full bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Sign Me In
          </button>
          <button className="mt-2 w-full bg-secondary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
            Create an account
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
