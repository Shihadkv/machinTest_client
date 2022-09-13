import { Link } from "react-router-dom";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
 
  createTheme,

  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";




const theme = createTheme({
  typography: {
    body1: {
      color: "red",
    },
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    console.log("not value");
    errors.name = "Required";
  } else if (values.name.length > 15) {
    console.log("not length");
    errors.name = "Must be 15 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }


  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "password must be 8 character long ";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 8) {
    errors.confirmPassword = "password must be 8 character long ";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "your passsword doesn't match";
  }
  return errors;
};

const Register = () => {
 
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      await axios.post("https://sticky-notes-service.herokuapp.com/api/auth/register", values).then((response) => {
        console.log(response,"its response");
        // handleOpen();
        console.log(response);
        if (response.data) {
          // handleOpen()
          console.log(response);
          navigate("/login");
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-2xl text-black w-full">
            <h1 className="mb-8 text-3xl text-center">SIGN UP</h1>

            <ThemeProvider theme={theme}>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="name"
                placeholder="name"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username ? (
                <Typography variant="body1">
                  {formik.errors.username}
                </Typography>
              ) : null}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <Typography variant="body1">{formik.errors.email}</Typography>
              ) : null}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <Typography variant="body1">
                  {formik.errors.password}
                </Typography>
              ) : null}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              {formik.errors.confirmPassword ? (
                <Typography variant="body1">
                  {formik.errors.confirmPassword}
                </Typography>
              ) : null}

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-darkgreen text-black hoverborder-b-gray-900 focus:outline-none my-1"
              >
                Create Account
              </button>
            </ThemeProvider>
          </div>
          <Link to="/login">
            <div className="text-grey-dark mt-6 no-underline border-b border-blue text-blue">
              Already have an account? Login
            </div>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
