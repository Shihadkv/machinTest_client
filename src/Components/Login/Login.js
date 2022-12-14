import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {

  const {loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://sticky-notes-service.herokuapp.com/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <input
            type="text"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
          />
          <input
            required
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="block border border-grey-light w-full p-3 rounded mb-4"
          />
          <button
            disabled={loading}
            onClick={handleClick}
            className="block border bg-darkgreen border-grey-light text-black w-full p-3 rounded mb-4"
                 >
            Login
          </button>

          {error && (
            <span className="text-red-600 text-sm text-center pb-2">
              {error.message}
            </span>
          )}
          <Link to="/register">
            <h1 className="mb- text-xs text-center no-underline cursor-pointer">
              Don't have account click Here{" "}
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
