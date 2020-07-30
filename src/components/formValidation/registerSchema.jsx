import * as yup from 'yup';


const registerSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .required('Name is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .required('Password creating is required.'),
    email: yup
        .string()
        .email('Must be a valid email address.')
        .required('Must include email address.'),
    terms: yup
        .boolean()
        .oneOf([true], 'Must accept terms of service.')

})

export default registerSchema;