import React, { useState, useEffect } from 'react';
import './App.css';
import Logon from './components/Logon'
import Register from './components/Register'
import axios from 'axios'
import { Link, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import registerSchema from './components/formValidation/registerSchema';
import * as yup from 'yup';

//set up initial value for user and formValues state.

const initialUser = {
  username: '',
  password: '',
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
const apiURL = 'https://jmesull-wunderlist.herokuapp.com/createnewuser'


function App() {

  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  //login is the callback that passed to logon and used for POST user to API
  const login = () => {
    axios.post(apiURL, user)
      .then(result => console.log(result.data))
      .catch(error => console.log(error))
  }


  //posts new user info to API from registration form when submitted
  const submit = () => {
    axios.post(apiURL, formValues)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {

      })
  }



  //inputUser is the callback that passed to logon and used for update user state
  const inputUser = (name, value) => {
    const newUser = {
      ...user,
      [name]: value,
    }
    console.log(newUser)
    setUser(newUser)
  }



  const update = (name, value) => {
    yup
      .reach(registerSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(error => {
        console.log(error.errors)
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0]
        })
      })

    const newUser = {
      ...formValues,
      [name]: value,
    }
    setFormValues(newUser)
    console.log(newUser)
  }



  useEffect(() => {
    registerSchema
      .isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      });
  }, [formValues]);

  return (
    <div className='App'>
      <Header />
      {/*-----------Logon page-------------*/}
      <Route exact path="/">
        <Logon user={user} inputUser={inputUser} login={login} />
        <p>If you are not registered, please hit the button for registration:</p>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </Route>
      {/*--------------Register-------------------*/}
      <Route path="/register">
        <Register
          values={formValues}
          errors={formErrors}
          submit={submit}
          update={update}
          disabled={disabled}
        />
      </Route>
      <Footer />
    </div>
  )
}

export default App;
