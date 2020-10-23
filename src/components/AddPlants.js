import React, { useState, useEffect } from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";
import * as yup from 'yup';
import "../style/signup-login.css";
import styled from "styled-components";

//styled components
const MainCardContainer = styled.div`
    width: 35rem;
    height: 35rem;
    text-align: center;
    margin: 2% auto;
    font-family: Raleway;
    border-radius: 10px;
    font-size: 2.7rem;
    background: white;
`
const CardImageDiv = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`
const Image = styled.img`
    width: 100%;
    height: auto;
    box-shadow: 2px 2px 2px black;
`
const AddButton = styled.button`
    font-size: 1.5rem;
    font-family: Raleway;
    color: white;
    border-radius: 10px;
    background: #95DC12;
    border: none;
    margin-top: 15px;
    padding: 8px 12px;
    &:hover {
        background: yellow;
        color: green;
    }
`

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
            });
            validateChange(e);
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
    return (
        <>
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
                placeholder="paste image address"
                values={values.image_url}
                onChange={inputChange}
                />
                </label>
            </div>
            <AddButton disabled={buttonDisabled}>Add plant!</AddButton>
        </form>
        </div>
        <MainCardContainer>
        <CardImageDiv>
        <Image src={`${values.image_url}`} alt="">
        </Image>
        </CardImageDiv>  
        </MainCardContainer>
        </>
    )
}
