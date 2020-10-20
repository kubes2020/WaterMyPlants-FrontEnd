import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';



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
      <>
      <h1>Signup</h1>
      <p>Choose a username and password</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Enter your Username
                    <input 
                    type="text"
                    name="username"
                    placeholder="username"
                    values={values.username}
                    onChange={inputChange}

                    />
                </label>
            </div>
            <div>

                <label htmlFor="password">Enter a password
                    <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    values={values.password}
                    onChange={inputChange}

                    />
                </label>
            </div>
            <button disabled={buttonDisabled} type='submit'>Sign Up</button>

        </form>
        </>
    )
}