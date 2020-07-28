import React from 'react';
import styled from 'styled-components';


// const StyledRegister = styled.div`

// `

//END OF STYLES




const Register = props => {

    const {
        values,
        errors,
        submit,
        update
    } = props

    const changeHandler = (e) => {
        e.persist(e)
        const name = e.target.name
        const value = e.target.value
        update(name, value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        submit();

    }


    return (
        <div className='registration-form'>
            <form onSubmit={submitHandler} className='register-form'>
                <h2>User Registration</h2>

                <label htmlFor='username'>
                    Username:
                    <input
                        type='text'
                        name='username'
                        placeholder='Create New Username'
                        value={values.username}
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor='password'>
                    Password
                    <input
                        type='text'
                        name='password'
                        placeholder='Create New Password'
                        value={values.password}
                        onChange={changeHandler}
                    />
                </label>
                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.password}</div>
                </div>

                <button>Register!</button>
            </form>

        </div>
    )
}

export default Register