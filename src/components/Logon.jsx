import React from 'react';
import axiosWithAuth from "../utils/axiosWithAuth"
import styled from 'styled-components'

const StyledLogon = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  .btn {
    background-color: #e07a5f;
    padding: 5px 15px;
    border-radius: 5px;
    border-color: #e07a5f;
    margin: 20px 0; 
  }

  .input{
    padding: 10px;
    box-shadow:none;
    border-radius: 5px;
    border: 1px solid lightgray;
  }

`

const Logon = props => {

    const {user, login, inputUser} = props


  const submitHandler = event => {
      event.preventDefault()
        login()
    }

    const inputHandler = event => {
        const name = event.target.name
        const value = event.target.value
        inputUser(name, value)
    }

    return (
      <StyledLogon>
        <form onSubmit={submitHandler}>
          <label>
            <h4>Username:</h4>
            <input
              name="username"
              type="text"
              placeholder="username"
              value={user.username}
              onChange={inputHandler}
              className="input"
            ></input>
          </label>
          <label>
            <h4>Password:</h4>
            <input
              name="password"
              type="text"
              placeholder="password"
              value={user.password}
              onChange={inputHandler}
              className="input"
            ></input>
          </label>
          <label>
            <button className="btn">Login</button>
          </label>
        </form>
      </StyledLogon>
    )
}

export default Logon