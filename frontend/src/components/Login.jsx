import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../Axios/axios.js";
import TokenContext from "../context/TokenContext.js";
import { useTheme } from "../context/ThemeContext.js";
function Login() {
  const [formData, setFormData] = useState({});
  const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
  const { isDarkMode } = useTheme();
  const [error, setError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("/user/login", formData);
      tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
      userDispatch({ type: "SET_USER", payload: result.data.user });
      localStorage.setItem("authToken", JSON.stringify(result.data.token));
    } catch (error) {
      console.log(error);
      setError({ message: error.response.data.message });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
    >
      {userToken && <Navigate to="/" />}
      <section className="login-container">
        <div className="px-6 h-full">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form method="post" onSubmit={handleSubmit}>
                <div>
                  {error && (
                    <div
                      className={`text-center border-2 p-2 mb-2 rounded-md shadow-2xl transition-colors duration-300 ${
                        isDarkMode
                          ? "border-red-500 bg-red-900 text-red-200"
                          : "border-green-600 bg-red-200 text-red-800"
                      }`}
                    >
                      {error.message}
                    </div>
                  )}
                </div>
                {/* Email input */}
                <div className="mb-6">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal rounded transition ease-in-out m-0 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-white bg-gray-700 border-gray-600 focus:bg-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        : "text-gray-700 bg-white border-gray-300 focus:bg-white focus:border-blue-600 focus:ring-blue-500"
                    }`}
                    id="emailInput"
                    placeholder="Email address"
                  />
                </div>
                {/* Password input */}
                <div className="mb-6">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className={`form-control block w-full px-4 py-2 text-xl font-normal rounded transition ease-in-out m-0 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                      isDarkMode
                        ? "text-white bg-gray-700 border-gray-600 focus:bg-gray-600 focus:border-blue-500 focus:ring-blue-500"
                        : "text-gray-700 bg-white border-gray-300 focus:bg-white focus:border-blue-600 focus:ring-blue-500"
                    }`}
                    id="passInput"
                    placeholder="Password"
                  />
                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`inline-block px-7 py-3 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out ${
                      isDarkMode
                        ? "bg-blue-700 text-white hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900"
                        : "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800"
                    }`}
                  >
                    Login
                  </button>
                  <p
                    className={`text-sm font-semibold mt-2 pt-1 mb-0 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Don't have an account?
                    <Link
                      to={"/register"}
                      className={`transition duration-200 ease-in-out ml-5 ${
                        isDarkMode
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-red-600 hover:text-red-700"
                      }`}
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
