import React, { useState, useEffect } from "react"
import "./App.css"
import Logon from "./components/Logon"
import Register from "./components/Register"
import axios from "axios"
import { Link, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Comments from "./components/Comments"
import registerSchema from "./components/formValidation/registerSchema"
import loginSchema from "./components/formValidation/loginSchema"
import * as yup from "yup"
import styled from "styled-components"
import PrivateRoute from "./utils/PrivateRoute.js"

const StyledApp = styled.div`
  background-color: #f4f1de;
  color: #3d405b;
  display: flex;
  flex-direction: column;

  .main {
    max-width: 500px;
    margin: 100px auto;
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

//initial states for user login-------------------------

const initialUser = {
  username: "",
  password: "",
}

const initialUserErrors = {
  username: "",
  password: "",
}


//Initial states for new user registration form----------
const initialFormValues = {
  username: "",
  password: "",
  email: "",
  terms: false,
}

const initialFormErrors = {
  username: "",
  password: "",
  email: "",
  terms: "",
}

//initially disabled Login and Register buttons---------
const initialUserLoginDisabled = true
const initialRegDisabled = true

//array of comment cards--------------------------------
const initialComments = []

//API get/post request page-----------------------------
const apiURL = "https://jmesull-wunderlist.herokuapp.com/createnewuser"
const fakeCommentsURL = "https://5f21ae29daa42f0016665eea.mockapi.io/comments/"

function App() {
//logon states------------------------------------------
  const [user, setUser] = useState(initialUser)
  const [loginErrors, setLoginErrors] = useState(initialUserErrors)
  const [loginDisabled, setLoginDisabled] = useState(initialUserLoginDisabled)
  const [comments, setComments] = useState(initialComments)

//registration states-----------------------------------
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [regDisabled, setRegDisabled] = useState(initialRegDisabled)


  //login is the callback that passed to logon and used for POST user to API
  const login = () => {
    axios
      .post(apiURL, user)
      .then((result) => {
        console.log(result.data)
        alert(`User Scope: ${result.data.scope}`)
      })
      .catch((error) => alert(error))
  }


  //post request to register new user-------------------

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
    yup
      .reach(loginSchema, name)
      .validate(value)
      .then((valid) => {
        setLoginErrors({
          ...loginErrors,
          [name]: "",
        })
      })

      .catch((error) => {
        console.log(error.errors)
        setLoginErrors({
          ...loginErrors,
          [name]: error.errors[0],
        })
      })

    const newUser = {
      ...user,
      [name]: value,
    }
    setUser(newUser)
  }

  
  //registration validation - updates list of users to include new registered user

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


  //registration form cancel button---------------------
  const cancel = () => {
    setFormValues(initialFormValues)
    setFormErrors(initialFormErrors)
  }

  //register schema-------------------------------------
  useEffect(() => {
    registerSchema.isValid(formValues).then((valid) => {
      setRegDisabled(!valid)
    })
  }, [formValues])

  //logon schema----------------------------------------
  useEffect(() => {
    loginSchema.isValid(user).then((valid) => {
      setLoginDisabled(!valid)
    })
  }, [user])

  //GET request - comment cards-------------------------
  useEffect(() => {
    axios
      .get(fakeCommentsURL)
      .then((result) => {
        setComments(result.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <StyledApp className="App">
      <Header />
      <div className="main">
        {/*-----------------Logon page------------------*/}
        <Route exact path="/">
          <div className="login">
            <Logon
              user={user}
              inputUser={inputUser}
              login={login}
              errors={loginErrors}
              disabled={loginDisabled}
            />
          </div>
          <div className="register">
            <h3>Registration</h3>
            <p>
              If you are not registered, please hit the button for registration:
            </p>
            <Link to={"/register"}>
              <button className="btn">Register</button>
            </Link>
          </div>
        </Route>
        {/*--------------Register form-------------------*/}
        <Route path="/register">
          <Register
            values={formValues}
            errors={formErrors}
            regDisabled={regDisabled}
            submit={submit}
            update={update}
            cancel={cancel}
          />
        </Route>
      </div>
      {/* --------------Comments section----------------- */}
      <div className="comments">
        <Comments comments={comments} />
      </div>
      <Footer />
    </StyledApp>
  )
}

export default App
