import React from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { withFormik } from 'formik';


import { Input, Heading, FormDiv, Button, Error } from 'styled-components'
    

const Login = props => {
    const { errors, touched } = props;


    return (
        <>
          <Heading>Login</Heading>
          <FormDiv>
            {touched.username && errors.username && (
              <Error>{errors.username}</Error>
            )}
            <Input type="text" name="username" placeholder="username" />
    
            {touched.password && errors.password && (
              <Error>{errors.password}</Error>
            )}
            <Input type="password" name="password" placeholder="password" />
    
            <Button type="submit">Login</Button>
          </FormDiv>
        </>
      );
    };
    
    export default withFormik({
      mapPropsToValues: values => {
        return {
          username: values.username || '',
          password: values.password || ''
        };
      },
      validationSchema: yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
      }),
      validateOnChange: false,
      validateOnBlur: false,
     
     
    //   handleSubmit: (values, { props, resetForm }) => {
    //     axios
    //       .post()
    //       .then(res => {})
          
    //       .catch(err => {
    //         return err.response;
    //       });
     
        }
    
    })(Login);








