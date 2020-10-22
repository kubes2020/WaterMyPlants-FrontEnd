import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from "yup";
import "../style/signup-login.css";

const formSchema = yup.object().shape({
  username: yup.string().required("Name is a required field."),
  password: yup
    .string()
    .required("Must include your password."),
});

export default function Login(props) {
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

  const handleSubmit = e => {
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
  
  <div className="ls-form"> 
<form onSubmit={handleSubmit}>
    <div className="form-header">
        <h1>Login</h1>
        <h2>Lets water</h2>
    </div>

    <br></br>
    
   <div className="ls-text">
    <label htmlFor="name"><b>Username: </b></label>
    <input type="text" name="username" value={formState.username} onChange={inputChange} placeholder="Enter your Username" />
   </div>
   
    <br></br>
    
    <div className="ls-text"> 
    <label htmlFor="password"><b>Password: </b></label>
    <input type="password" name="password" value={formState.password} onChange={inputChange} placeholder="Enter your Password" />
    </div>

    <br></br>

    <div className="logBtn">
      <button disabled={buttonDisabled}>Login</button>
    </div>

<br></br>

    <div className="form-already">
      <p className="text-link">Not a member yet? <Link to="/signup"><b>Sign-up here</b></Link></p>
    </div>
</form>
    </div> 
  );
}

