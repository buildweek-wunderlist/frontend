import React, { useState } from 'react';
import './App.css';
import Logon from './components/Logon';
import Register from './components/Register';
import axios from 'axios';
import registerSchema from './validation/registerSchema';
import * as yup from 'yup';



const initialFormValues = {
  username: '',
  password: '',
}

const initialFormErrors = {
  username: '',
  password: '',
}


function App() {

  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)


  const submit = () => {
    axios.post('https://jmesull-wunderlist.herokuapp.com/createnewuser', formValues)
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {

      })
  }

  const update = ( name, value ) => {
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


  return (
    <div>
      <Logon />
      <Register
        values={formValues}
        errors={formErrors}
        submit={submit}
        update={update}
      />
    </div>
  );
}

export default App;
