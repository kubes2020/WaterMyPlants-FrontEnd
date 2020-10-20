
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';

export default function AddPlants() {
    const [values, setValues] = useState({
        nickname: "",
        species: "",
        h2o_frequency:0,
        img_url:"",
    });
    const [errors, setErrors] = useState({
        nickname: "",
        species: "",
        h2o_frequency: 0,
        img_url:"",
    });
    const formSchema = yup.object().shape({
        nickname: yup
        .string()
        .required(2, "Nickname is a required field."), 
        species: yup
        .string()
        .required("Must include plant species."),
        h2o_frequency: yup
        .number()
        .required("Must include plant watering frequency."),
        img_url: yup
        .string()
        .required("Must include plant picture."),
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
            setValues({
            nickname: "",
            species: "",
            h2o_frequency: 0,
            img_url:"",
    });
        };
        const inputChange = e => {
            e.persist();
            setValues({
            ...values,
            [e.target.name]: e.target.value
                // e.target.type === "checkbox" ? e.target.checked : e.target.value
            });
            validateChange(e);
            // setValues(newFormData);
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
        <p>
        {values.nickname}
        </p>
        <p>
        {values.species}
        </p>
        <p>
        {values.h2o_frequency}
        </p>
        <img src={`${values.img_url}`} alt="">
        </img>  
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nickname">Enter your plant's nickname: 
                <input 
                type="text"
                name="nickname"
                placeholder="Your plant's nickname"
                values={values.nickname}
                onChange={inputChange}
                />
                </label>
            </div>
            <div>
                <label htmlFor="species">What is the species of your plant?
                <input 
                type="text" 
                name="species"
                placeholder="Your plant's species"
                values={values.species}
                onChange={inputChange}
                />
                </label>
            </div>
            <div>
                <label htmlFor="h2o_frequency">Enter your plant's water frequency:
                <input
                type="number"
                name="h2o_frequency"
                placeholder="Your plant's water window"
                values={values.h2o_frequency}
                onChange={inputChange}
                />
                </label>
            </div>
            <div>
                <label htmlFor="img_url">Post a picture of your plant:
                <input
                type="text"
                name="img_url"
                placeholder="Your plant's picture"
                values={values.img_url}
                onChange={inputChange}
                />
                </label>
            </div>
            <button disabled={buttonDisabled}>Add plant!</button>
        </form>
        </>
    )
}





