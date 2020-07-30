import * as yup from 'yup';


const registerSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required(),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .required(),
    email: yup
        .string()
        .email('Email must be a valid email address.')
        .required(),
    terms: yup
        .boolean()
        .oneOf([true], 'Must accept Terms of Service.')

})

export default registerSchema;