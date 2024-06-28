import React, { useState } from "react";
import "./login.css";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../Redux/authAction";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, Navigate } from "react-router-dom";

import * as Yup from "yup";

const Login = () => {
  const [formValue, setformValue] = useState("");
  const dispath = useDispatch();
  const { auth } = useSelector((store) => store);
  const loginError = useSelector((state) => state.auth.error); // Assuming 'auth' is your slice of state where errors are stored
  const token = localStorage.getItem("token");

  const handleSubmit = (value) => {
    dispath(loginUserAction({ data: value }));
    console.log(value);
  };
  const handleform = () => {
    setformValue(" ");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="login">
      <div className="item">
        <h1>PingMe</h1>
        <p>ping you error to others</p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required email ";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required password  ";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/i.test(
                values.password
              )
            ) {
              errors.password = "Invalid password ";
            }
            return errors;
          }}
        >
          <Form>
            <Field name="email" type="text" placeholder="Email" />
            <ErrorMessage name="email" component="div" />

            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            {loginError && (
              <div className="error-message">
                {loginError?.response?.data?.message}
              </div>
            )}

            <button className="signin" type="submit">
              SignIn
            </button>

            <button className="forget">Forgotten password?</button>
            <span>if you don't have account ?</span>
            <Link to="/register">
              <button className="signin">Register</button>
            </Link>
          </Form>
        </Formik>
      </div>
      <hr />
    </div>
  );
};

export default Login;
