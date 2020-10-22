import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';
import { Link } from "react-router-dom";
import "../style/signup-login.css";


export default function SignUp(props) {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });


    const [errors, setErrors] = useState({
        username: "",
        password: "",
    })


    const formSchema = yup.object().shape({
        username: yup
        .string()
        .required(2, "Username is a required field."), 
        password: yup
          .string()
          .required("Must include password."),
      });

      const [buttonDisabled, setButtonDisabled] = useState(true);

      useEffect(() => {
        formSchema.isValid(values).then(valid => {
          setButtonDisabled(!valid);
        });
      }, [values]);



const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting ", values);
    axiosWithAuth().post("/auth/register", values)
    .then(res => {
        console.log("res from SignUp", res)
        props.setIsLoggedIn(true)
        props.history.push("/login")
        setValues({
            username: "",
            password: "",
        }); 
    })
    .catch(err => {
        console.log("error with SignUp", err)
    })    
    };


    const inputChange = e => {
        e.persist();
        setValues({
          ...values,
          [e.target.name]: e.target.value

        });
    
        validateChange(e);

      };

      const validateChange = e => {
        // Reach will allow us to "reach" into the schema and test only one part.
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
    return (
      <div className="ls-form">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1>
              Sign-up  
            </h1>

            <h2>Make plants happy</h2>
            
          </div>
          <br></br>
            <div className="ls-text">
                <label htmlFor="username"><b>Create a Username:</b></label>
                    <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={inputChange}

                    />
                
            </div>
            <div className="ls-text">

                <label htmlFor="password"><b>Create a Password:</b></label>
                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={inputChange}

                    />
                
            </div>
            <div className="form-terms">
            <p>
            <b>By selecting Agree and continue below, I agree to Water My Plants' Terms and Conditions.</b>
            </p>
            </div>

            <button disabled={buttonDisabled} type='submit'>Agree and continue</button>
            
            <div className="form-already">
              <p className="text-link">Already have an account? <Link to="/Login">Log in</Link></p>
            </div>
        </form>
        </div>
    )
}
