import React, { useState } from 'react';
import './App.css';
import Logon from './components/Logon'
import Register from './components/Register'
import axios from 'axios'
import { Link, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import registerSchema from './components/formValidation/registerSchema';
import * as yup from 'yup';
import PrivateRoute from './utils/PrivateRoute.js'

//set up initial value for user and formValues state.

const initialUser = {
  username: '',
  password: '',
}

const initialFormValues = {
  username: '',
  password: '',
}

const initialFormErrors = {
  username: '',
  password: '',
}


//API post request page
const apiURL = 'https://jmesull-wunderlist.herokuapp.com/createnewuser'


function App() {

  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)


  //login is the callback that passed to logon and used for POST user to API
  const login = () => {
    axios.post(apiURL, user)
      .then(result => console.log(result.data))
      .catch(error => console.log(error))
  }

  
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
    yup.reach(registerSchema, name)
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
  }




  // two function

  return (
    <div className='App'>
      <Header />
      {/*-----------Logon page-------------*/}
      <Route exact path="/">
        <Logon user={user} inputUser={inputUser} login={login} />
        <p>If you are not registed, please hit the button for registration:</p>
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
        />
      </Route>
      <Footer />
    </div>
  )
}

export default App;
