import React from 'react';
import axiosWithAuth from "../utils/axiosWithAuth"
import styled from 'styled-components'

const StyledLogon = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  .input {
    padding: 10px;
    box-shadow: none;
    border-radius: 5px;
    border: 1px solid lightgray;
  }
`

const StyledButton = styled.button`
  padding: 5px 15px;
  border-radius: 5px;
  margin: 20px 0;
  font-size: 100%;
  background-color: #e07a5f;
  border-color: #e07a5f;
  color: #f4f1de;

  &:disabled {
    background-color: #f2cc8f;
    color: #f4f1de;
    border-color: #f2cc8f;
  }
`

const Logon = props => {

    const {user, login, inputUser, errors, disabled} = props


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
            <div>{errors.username}</div>
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
            <div>{errors.password}</div>
          </label>
          <label>
            <StyledButton disabled={disabled}>Login</StyledButton>
          </label>
        </form>
      </StyledLogon>
    )
}

export default Logon