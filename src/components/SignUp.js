import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { useHistory } from 'react-roter-dom';



export default function Signup() {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const [newUser, setNewUser] = useState(null);
    // function validateForm() {
    //     return (
    //         values.username > 0 &&
    //         values.password.length > 0 &&
    //     );
    // }
    
const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting ", values);
        setValues({
            username: "",
            password: "",
        }); 
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                .string()
                .min(2, "username must be more than 2 characters")
                .required()
                <label>Enter your Username
                    <input 
                    type='text'
                    name='username'
                    placeholder='username'
                    values={values.username}
                    />
                </label>
            </div>
            <div>
                <label>Enter a password
                    .string()
                    .min(8, "password must be more than eight characters")
                    .required()  
                    <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    values={values.password}
                    
                    />
                </label>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    )
}