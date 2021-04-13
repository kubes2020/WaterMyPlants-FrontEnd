import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../style/signup-login.css";
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup.string().required("Name is a required field."),
  password: yup.string().required("Must include your password."),
});

export default function Settings(props) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Settings", formState);
    const userId = localStorage.getItem("id");
    axiosWithAuth()
      .put(`/users/${userId}`, formState)
      .then((res) => {
        console.log("res from Settings", res);
        props.history.push("/plantcard");
        setFormState({
          username: "",
          password: "",
        });
      })
      .catch((err) => {
        console.log("error with Settings", err);
      });
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <>
      <div className="form-container">
        <div className="ls-formes">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <h2>Change Account Settings</h2>
              <br></br>
            </div>
            <div className="ls-text">
              <label htmlFor="name">New Username</label>
              <input
                type="text"
                name="username"
                value={formState.username}
                onChange={inputChange}
                placeholder="Enter your Username"
              />
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={inputChange}
                placeholder="Enter your Password"
              />
              <button disabled={buttonDisabled}>Submit Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
