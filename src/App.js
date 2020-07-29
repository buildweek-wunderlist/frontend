
import React, { useState, useEffect } from 'react';
import "./App.css"
import Logon from "./components/Logon"
import Register from "./components/Register"
import axios from "axios"
import { Link, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import registerSchema from "./components/formValidation/registerSchema"
import * as yup from "yup"
import styled from "styled-components"
import PrivateRoute from "./utils/PrivateRoute.js"

const StyledApp = styled.div`
  background-color: #f4f1de;
  color: #3d405b;
  

  .main {
    max-width: 500px;
    margin: 150px auto;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 3px solid #3d405b;
    border-radius: 10px;
    padding: 20px;

    .login {
      width: 50%;
    }

    .register {
      width: 50%;
    }

    .btn {
      background-color: #e07a5f;
      padding: 5px 15px;
      border-radius: 5px;
      border-color: #e07a5f;
      margin: 20px 0;
      color: #f4f1de;
      font-size: 110%;
    }
  }
`

//set up initial value for user and formValues state.

const initialUser = {
  username: "",
  password: "",
}

const initialFormValues = {

  username: '',
  password: '',
  email: '',
  terms: false
}

const initialFormErrors = {
  username: '',
  password: '',
  email: '',
  terms: ''
}

const initialDisabled = true

//API post request page
const apiURL = "https://jmesull-wunderlist.herokuapp.com/createnewuser"

function App() {
  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //login is the callback that passed to logon and used for POST user to API
  const login = () => {
    axios
      .post(apiURL, user)
      .then((result) => console.log(result.data))
      .catch((error) => console.log(error))
  }



  //posts new user info to API from registration form when submitted

  const submit = () => {
    axios
      .post(apiURL, formValues)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {

      })
    setFormValues(initialFormValues)
  }

  //inputUser is the callback that passed to logon and used for update user state
  const inputUser = (name, value) => {
    const newUser = {
      ...user,
      [name]: value,
    }
    setUser(newUser)
  }


  const update = (name, value) => {
    yup
      .reach(registerSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch((error) => {
        console.log(error.errors)
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        })
      })

    const newUser = {
      ...formValues,
      [name]: value,
    }
    setFormValues(newUser)
    console.log(newUser)
  }

  const cancel = () => {
    setFormValues(initialFormValues)
  }

  useEffect(() => {
    registerSchema
      .isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      });
  }, [formValues]);


  return (
    <StyledApp className="App">
      <Header />
      {/*-----------Logon page-------------*/}

      <div className="main">
        <Route exact path="/">
          <div className="login">
            <Logon user={user} inputUser={inputUser} login={login} />
          </div>
          <div className="register">
            <h3>Registration</h3>
            <p>If you are not registered, please hit the button for registration:</p>
            <Link to={"/register"}>
              <button className="btn">Register</button>
            </Link>
          </div>
        </Route>
        {/*--------------Register-------------------*/}
        <Route path="/register">
          <Register
            values={formValues}
            errors={formErrors}
            submit={submit}
            update={update}
            disabled={disabled}
            cancel={cancel}
          />
        </Route>
      </div>
      <Footer />
    </StyledApp>
  )
}

export default App
