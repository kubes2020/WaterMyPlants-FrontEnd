import React, { useState, useEffect } from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import * as yup from 'yup';
import "../style/signup-login.css";

export default function AddPlants(props) {
    const [values, setValues] = useState({
        nickname: "",
        species: "",
        h2o_frequency: "",
        image_url: "",
    });
    const [errors, setErrors] = useState({
        nickname: "",
        species: "",
        h2o_frequency: "",
        image_url: "",
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
        image_url: yup
        .string()
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
        const userId = localStorage.getItem('id')
        console.log("userId", userId)
        axiosWithAuth().post(`/plants/user/${userId}`, values)
        .then(res => {
        console.log("res from AddPlants", res)
        props.history.push("/plantcard")
        setValues({
            nickname: "",
            species: "",
            h2o_frequency: "",
            image_url: "",}); 
        })
        .catch(err => {
            console.log("error with AddPlants", err)
        })    
    };


    

        const inputChange = e => {
            e.persist();
            setValues({
            ...values,
            [e.target.name]:
            e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
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
        <div>
        <img src={`${values.image_url}`} alt="">
        </img>  
        </div>
        <div className="ls-forms">
        <form onSubmit={handleSubmit}>
            <div className="ls-text">
                <label htmlFor="nickname">Plant Nickname: 
                <input class="inputcolor"
                type="text"
                name="nickname"
                placeholder="Nickname"
                values={values.nickname}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="species">Plant species?
                <input class="inputcolor"
                type="text" 
                name="species"
                placeholder="Species"
                values={values.species}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="h2o_frequency">Plant's water frequency?
                <input class="inputcolor"
                type="number"
                name="h2o_frequency"
                placeholder="Water frequency"
                values={values.h2o_frequency}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="image_url">Optional
                <input class="inputcolor"
                type="text"
                name="image_url"
                placeholder="Your plant's picture"
                values={values.image_url}
                onChange={inputChange}
                />
                </label>
            </div>
            <button disabled={buttonDisabled}>Add plant!</button>
        </form>
        </div>
        </>
    )
}
