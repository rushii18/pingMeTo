import React, { useState } from "react";
import "./register.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { resisterUserAction } from "../Redux/authAction";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

const Register = () => {
  const [formValue, setformValue] = useState("");
  const dispath = useDispatch();

  const handleSubmit = (value) => {
    dispath(resisterUserAction({ data: value }));
    console.log(value);
  };
  const handleform = () => {
    setformValue(" ");
  };
  return (
    <div className="register">
      <div className="item">
        <h3>Create Account</h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            contact: "",
          }}
          onSubmit={(value) => handleSubmit(value)}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required email ";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email  ";
            }
            if (!values.password) {
              errors.password = "password Required ";
            } else if (
              !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/i.test(
                values.password
              )
            ) {
              errors.password = "Invalid password address";
            }
            if (!values.firstName) {
              errors.firstName = " firstName Required ";
            }
            if (!values.lastName) {
              errors.lastName = "lastName Required ";
            }
            return errors;
          }}
        >
          <Form>
            <Field name="email" type="text" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
            <Field type="text" name="firstName" placeholder="Firstname" />
            <ErrorMessage name="firstName" component="div" />
            <Field type="text" name="lastName" placeholder="Lastname" />
            <ErrorMessage name="lastName" component="div" />
            <Field type="text" name="contact" placeholder="Contact" />

            <button className="signin" type="submit">
              Signup
            </button>
            <span>if hove account ?</span>
            <Link to="/login">
              <button className="signin">Login</button>
            </Link>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
