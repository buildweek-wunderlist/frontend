import React from 'react';

// import styled from 'styled-components';


// const StyledRegister = styled.div`

// `

//END OF STYLES



const Register = props => {

    const {
        values,
        errors,
        submit,
        update,
        disabled,
        cancel
    } = props

    const changeHandler = (e) => {
        e.persist(e)
        const name = e.target.name
        let value = e.target.value === 'checkbox' ? e.target.checked : e.target.value
        update(name, value)
    }

    const checkboxHandler = (e) => {
        const checked = e.target.checked
        const name = e.target.name
        update(name, checked)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        submit();
        console.log('Submitted!');

    }


    return (
        <div className='registration-form'>
            <form onSubmit={submitHandler} className='register-form'>
                <h2>User Registration</h2>

                <label htmlFor='username'>
                    Username
                    <input
                        type='text'
                        name='username'
                        placeholder='Create New Username'
                        value={values.username}
                        onChange={changeHandler}
                    />
                </label>

                <label htmlFor='email'>
                    Email
                    <input
                        type='text'
                        name='email'
                        placeholder='Enter email address'
                        value={values.email}
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

                <div className='terms-link'>
                    <a href='Register' onClick={(e) => e.preventDefault()}>Read Terms</a>
                </div>

                <label htmlFor='terms'>
                    Accept Terms
                    <input
                        type='checkbox'
                        name='terms'
                        checked={values.terms}
                        onChange={checkboxHandler}
                    />
                </label>


                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>

                <button disabled={disabled}>Register!</button>
                <button id='cancel' onClick={(e) => cancel()}>Cancel</button>
            </form>

        </div>
    )
}

export default Register