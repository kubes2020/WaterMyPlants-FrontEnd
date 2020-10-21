// import React from "react";

// export const Login = () => {

//   return(
//     <>
//     <h2>Login Page</h2>
//     </>
//   )
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

  
 
  

import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup.string().required("Name is a required field."),
  password: yup
    .string()
    .required("Must include your password."),
});

export default function Login() {
  
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
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    
  };

  const validateChange = e => {
    
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    
<form onSubmit={formSubmit}>
    <div className="form-header">
        <h1>Water My Plants Login</h1>
        <p>Welcome, lets keep your plants happy</p>
    </div>

    <label htmlFor="name">Username</label>
    <input type="text" name="username" value={formState.username} onChange={inputChange} placeHolder="Enter your Username" />

    <label htmlFor="password">Password</label>
    <input type="text" name="password" value={formState.password} onChange={inputChange} placeHolder="Enter your Password" />
          


    <button disabled={buttonDisabled}>Login</button>

    <p className="text-link">Not a member yet? <Link to="/SignUp">Sign-up here</Link></p>
</form>
    
  );
}

