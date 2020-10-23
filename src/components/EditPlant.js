import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';
import { PlantContext } from "./contexts/PlantContext";
import styled from "styled-components";
import "../style/signup-login.css";

const MainCardContainer = styled.div`
    width: 90%;
    height: 90%;
    text-align: center;
    margin: 2% auto;
    font-family: Raleway;
    padding: .5% 0 2% 0;
    border-radius: 10px;
    font-size: 3rem;
    background: white;
`
const CardImageDiv = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 90%;
    height: 60%;
`
const Image = styled.img`
    width: 100%;
    height: auto;
    box-shadow: 2px 2px 2px black;

`
const DivText = styled.div`
    font-size: 2rem;
    font-family: "Source Sans Pro", Helvetica, sans-serif;
    padding: 1%;
`
const Button = styled.button`
    font-size: 1.5rem;
    color: #BE1F1F ;
    border: none;
    border-radius: 10px;
    background: lightgrey;
    margin-left: 5px;
`
const SubmitButton = styled.button`
    font-size: 1.5rem;
    color: white;
    border-radius: 10px;
    background: #81A99D;
    border: none;

`


export default function EditPlant(props){
    const { plantId, setPlantId } = useContext(PlantContext)

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

    useEffect(() => {
        axiosWithAuth().get(`/plants/${plantId}`)
        .then(res => {
            console.log("res from editPlants", res.data)
            setValues(res.data)
        })
        .catch(err => {
            console.log("error with editPlants", err)
        })
    },[])

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
        console.log("Submitting Put", values);
        axiosWithAuth().put(`/plants/${plantId}`, values)
        .then(res => {
        console.log("res from editPlant", res)
        props.history.push("/plantcard")
        setValues({
            nickname: "",
            species: "",
            h2o_frequency: "",
            image_url: "",}); 
        })
        .catch(err => {
            console.log("error with editPlant", err)
        })    
    };

    const handleDelete = () => {
        console.log("Submitting Delete");
        axiosWithAuth().delete(`/plants/${plantId}`)
        .then(res => {
        console.log("res from handleDelete", res)
        props.history.push("/plantcard")
        setValues({
            nickname: "",
            species: "",
            h2o_frequency: "",
            image_url: "",}); 
        })
        .catch(err => {
            console.log("error with handleDelete", err)
        }) 

    }

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
        <MainCardContainer>
        <CardImageDiv>
        <Image src={`${values.image_url}`} alt="">
        </Image>  
        </CardImageDiv>
        <div className="ls-forms">
        <form onSubmit={handleSubmit}>
            <div className="ls-text">
                <label htmlFor="nickname">Plant Nickname: 
                <input 
                type="text"
                name="nickname"
                placeholder="Nickname"
                value={values.nickname}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="species">Plant species?
                <input 
                type="text" 
                name="species"
                placeholder="Species"
                value={values.species}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="h2o_frequency">Plant's water frequency?
                <input
                type="number"
                name="h2o_frequency"
                placeholder="Water frequency"
                value={values.h2o_frequency}
                onChange={inputChange}
                />
                </label>
            </div>
            <div className="ls-text">
                <label htmlFor="image_url">Optional
                <input
                type="text"
                name="image_url"
                placeholder="Your plant's picture"
                value={values.image_url}
                onChange={inputChange}
                />
                </label>
            </div>
            <SubmitButton disabled={buttonDisabled}>Submit Update</SubmitButton>
            <Button onClick={handleDelete}>Delete Plant</Button>
        </form>
        </div>
        </MainCardContainer>
        </>
    )
}
