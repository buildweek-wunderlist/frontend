import * as yup from "yup"

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required"),
  password: yup
    .string()
    .required("Password is required."),
})

export default loginSchema
