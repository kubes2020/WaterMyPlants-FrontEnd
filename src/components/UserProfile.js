import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";
import * as decode from "jwt-decode";


import { Input, Heading, FormDiv, Button, Error } from 'styled-components'



// Styleieng
const SubHeading = styled.h2

const FlexContainer = styled.div

const Info = styled.div

const Item = styled.h3

const Value = styled.span





// export default props => {
//     const [data, setData] = useState([]);
//     const [key] = useState(());
//     const [url] = useState();
//     const [config] = useState({
//       headers: {}
//     });
  
    useEffect(() => {
      axios
        .get(url, config)
        .then(res => {
          setData(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [config, url]);
  
    return (
      <>
        <Heading>Welcome, {data.username}!</Heading>
        
        <FormDiv>
        
          <SubHeading>User Profile</SubHeading>
        
          <FlexContainer>
            
            <Info>
              <Value>{data.fullname}</Value>
              <Item>Name</Item>
            </Info>
            
            <Info>
              <Value>{data.username}</Value>
              <Item>Username</Item>
            </Info>
            
            <Info>
              <Value>{data.phonenumber}</Value>
              <Item>Phone Number</Item>
            </Info>
          
          </FlexContainer>
        
        </FormDiv>
  
        <Formik
          initialValues={{ username: "", phonenumber: "" }}
          validationSchema={yup.object().shape({
            username: yup.string().required()    
          })}
          
          validateOnChange={false}
          validateOnBlur={false}
          
          onSubmit={(values, { resetForm }) => {
            let key = ();
  
            axios
              .put()
              .then(res => {
                setData(res.data);
                resetForm();
              })
              .catch(error => {
                console.log(error);
              });
          }}
          
          render={props => (
            <FormDiv onSubmit={props.handleSubmit}>
              <SubHeading>Update Profile</SubHeading>
              {props.touched.username && props.errors.username && (
                <Error>{props.errors.username}</Error>
              )}
          
              <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={props.handleChange}
              />
  
               
              <Button type="submit">Update</Button>
            </FormDiv>
          )}
        />
      </>
    );
  };