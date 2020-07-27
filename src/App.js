import React, {useState} from 'react';
import './App.css';
import Logon from './components/Logon'
import Register from './components/Register'
import axios from 'axios'
import { Link, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'


//set up initial value for user and formValues state.

const initialUser = {
  username: '',
  password: '',
}

const initialFormValues = {
  username: '',
  password: '',
}

//API post request page
const apiURL = 'https://jmesull-wunderlist.herokuapp.com/createnewuser'


function App() {

  const [user, setUser] = useState(initialUser)
  const [formValues, setFormValues] = useState(initialFormValues)

  //login is the callback that passed to logon and used for POST user to API
  const login = () => {
    axios.post(apiURL, user)
      .then(result => console.log(result.data))
    .catch(error => console.log(error))
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


  // two function

  return (
    <div>
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
        <Register />
      </Route>
      <Footer />
    </div>
  )
}

export default App;
