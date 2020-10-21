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
import "../style/signup-login.css";
  
 
  

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

    console.log("Submitting ", formState);
    axiosWithAuth().post("/auth/login", formState)
    .then(res => {
        console.log("res from Login", res)
        window.localStorage.clear()
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('id', res.data.user.id)
        props.setIsLoggedIn(true)
        props.history.push("/plantcard")
        setFormState({
            username: "",
            password: "",
        }); 
    })
    .catch(err => {
        console.log("error with Login", err)
    })    

    
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
  <div class="container">   
    <form onSubmit={formSubmit}>
      <div className="form-header">
        <h1>Login Here </h1>
        
        <h3>Lets keep your plants happy</h3>
     </div>

    <div>
      <label htmlFor="name">Username: </label>
      <input type="text" name="username" value={formState.username} onChange={inputChange} placeHolder="Enter your Username" />
    </div>
    
    <br></br>

    <div>
      <label htmlFor="password">Password: </label>
      <input type="text" name="password" value={formState.password} onChange={inputChange} placeHolder="Enter your Password" />
    </div> 

    <br></br>    
   
    <button disabled={buttonDisabled}>Login</button>

    <p className="text-link">Not a member yet? <Link to="/SignUp">Sign-up here</Link></p>
    </form>
  </div> 
  );
}

