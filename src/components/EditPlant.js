import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import * as yup from 'yup';
import { PlantContext } from "./contexts/PlantContext";

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
        <h2>Edit Page</h2>
        <div>
        <img src={`${values.image_url}`} alt="">
        </img>  
        </div>
        <form onSubmit={handleSubmit}>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <button disabled={buttonDisabled}>Submit Update</button>
            <button onClick={handleDelete}>Delete Plant</button>
        </form>
        </>
    )
}
