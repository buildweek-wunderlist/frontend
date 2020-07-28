import React from 'react';

const Logon = props => {

    const {user, login, inputUser} = props


    const submitHandler = () => {
        login()
    }

    const inputHandler = event => {
        event.preventDefault()
        const name = event.target.name
        const value = event.target.value
        inputUser(name, value)
    }

    return (
      <div>
        <h2>User Logon</h2>
        <form submit={submitHandler}>
          <label>
            <h3>Username:</h3>
                    <input
                        name='username'
                        type="text"
                        placeholder='username'
                        value={user.username}
                        onChange={inputHandler}
                    ></input>
          </label>
          <label>
            <h3>Password:</h3>
                    <input
                        name='password'
                        type='text'
                        placeholder='password'
                        value={user.password}
                        onChange={inputHandler}
                    ></input>
          </label>
          <label>
            <button>Login</button>
          </label>
        </form>
      </div>
    )
}

export default Logon