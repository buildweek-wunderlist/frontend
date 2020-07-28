import React from 'react';
import * as yup from 'yup';


const registerSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Name is required'),
    password: yup
        .string()
        .min(8, 'Must be at least 8 characters')
        .required('Password creating is required'),
    email: yup
        .string()
        .email('Must be a valid email address.')
        .required('Email is required'),
    terms: yup
        .boolean()
        .oneOf([true], 'Must accept terms of service')

})

export default registerSchema;