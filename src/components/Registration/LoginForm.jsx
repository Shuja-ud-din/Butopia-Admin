import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "super_admin",
  });

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // console.log("formdata ", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);

    setLoader(true);

    axios
      .post(`https://api.agerlink.it/api/v1/auth/login`, formData)
      .then((res) => {
        // console.log("res", res);
        // console.log("res data" , res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
        setMessage(res.data.message);

        setLoader(false);

        navigate("/users");

        if (res.data.success) {
          localStorage.setItem("email", val.email);
          // console.log("should navigate");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setLoader(false);

        console.log("error is ", err.response.data);
      });
  };

  return (
    <div className="bg-[#F4F4F5] w-[40%] xl:w-[50%] lg:w-[100%]">
      <div className="w-full h-full flex items-center">
        <form
          className="w-full px-14 sm:px-4 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 justify-center items-center">
            <img width={200} src="logo1.png" />
          </div>
          <br></br>

          {/* Email */}
          <div className="my-4">
            <input
              className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="my-4">
            <input
              className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <p className="text-center text-[red] text-[14px] my-3">{message}</p>

          <div className="mt-4 w-full">
            <button
              className="w-full flex justify-center bg-[#019320] text-[white] font-bold py-3 px-4 rounded-[12px] focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loader ? (
                <TailSpin
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa91f"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
