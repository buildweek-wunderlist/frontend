import React from 'react';
import styled from 'styled-components';


const StyledRegister = styled.div`

    .register-form {
        width: 500px;
    }

    .top-section {
        display: flex;        
    }

    .reg-left {
        width: 50%;
        padding-bottom: 1rem;
        line-height: 0;
    }

    .reg-right {
        width: 50%;
        padding: 2.5rem 0;
        line-height: 0;
    }

    .text-input-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .input-textfield {
        width: 85%;
        height: 1.5rem;
        border-radius: .5rem;
    }

    .asterisk {
        font-size: 1.5rem;
        color: red;
    }

    .bottom-section {
        display: flex;
        flex-direction: column;
    }

    .terms-accept-box {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .checkbox-label input {
        cursor: pointer;
    }

    .terms-group h4 {
        margin: 0;
        padding-right: .5rem;
        line-height: 1.3rem;
    }

    .errors {
        display: flex;
        flex-direction: column;
        padding: .5rem 0;
        color: red;
    }

    .required-text h5 {
        margin: 0;
        padding: .2rem 1.9rem .2rem 0;
        color: red;
    }

    .regform-buttons{
        display: flex;
        flex-direction: column;
    }

    .reg-button {
        display: flex;
        justify-content: center;
    }

    .cancel-button {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        height: 2rem;
    }

    #cancel-button {
        background-color: #E07A5F;
        border-color: #E07A5F;
        color: #F4F1DE;
        padding: .2rem .8rem;
        border-radius: .5rem .25rem; 
        font-size: 0.7rem;
        cursor: pointer;
    }

`
const StyledRegButton = styled.button`
    background-color: #E07A5F;
    border-color: #E87A5F;
    color: #F4F1DE;
    padding: .25rem 1.5rem;
    border-radius: .25rem;
    font-size: 1.1rem;
    letter-spacing: .1rem;
    cursor: pointer;

    &:disabled {
        background-color: #F2CC8F;
        border-color: #F2CC8F;
        color: #F4F1DE;
    }
`
//END OF STYLES

const Register = props => {
    const {
        values,
        errors,
        regDisabled,
        submit,
        update,
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
        <StyledRegister className='registration-form-container'>
            <form onSubmit={submitHandler} className='register-form'>
                <h2>New User Registration</h2>
                <div className='top-section'>
                    <div className='reg-left'>
                        <label htmlFor='username'>
                            <h4>Username:</h4>
                            <div className='text-input-container'>
                                <span className='asterisk'>*</span>
                                <input
                                    className='input-textfield'
                                    type='text'
                                    name='username'
                                    placeholder='Create New Username'
                                    value={values.username}
                                    onChange={changeHandler}
                                />
                            </div>
                        </label>
                        <label htmlFor='email'>
                            <h4>Email:</h4>
                            <div className='text-input-container'>
                                <span className='asterisk'>*</span>
                                <input
                                    className='input-textfield'
                                    type='text'
                                    name='email'
                                    placeholder='Enter email address'
                                    value={values.email}
                                    onChange={changeHandler}
                                />
                            </div>
                        </label>
                    </div>
                    <div className='reg-right'>
                        <label htmlFor='password'>
                            <h4>Create New Password:</h4>
                            <div className='text-input-container'>
                                <span className='asterisk'>*</span>
                                <input
                                    className='input-textfield'
                                    type='text'
                                    name='password'
                                    placeholder='Must be minimum of 8 characters.'
                                    value={values.password}
                                    onChange={changeHandler}
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <div className='bottom-section'>
                    <div className='terms-group'>
                        <div className='terms-link'>
                            <a href='Register' onClick={(e) => e.preventDefault()}>Read Terms</a>
                        </div>
                        <div className='terms-accept-box'>
                            <h4><span className='asterisk'>* </span>Accept Terms</h4>
                            <label htmlFor='terms' className='checkbox-label'>
                                <input
                                    type='checkbox'
                                    name='terms'
                                    checked={values.terms}
                                    onChange={checkboxHandler}
                                />
                            </label>
                        </div>
                    </div>
                    <div className='errors'>
                        <div>{errors.username}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.terms}</div>
                    </div>
                    <span className='required-text'><h5><span className='asterisk'>* </span>Required</h5></span>

                    <div className='regform-buttons'>
                        <div class='reg-button'>
                            <StyledRegButton id='reg-button' disabled={regDisabled}>Register!</StyledRegButton>
                        </div>
                        <div class='cancel-button'>
                            <button id='cancel-button' onClick={(e) => cancel()}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </form>
        </StyledRegister>
    )
}

export default Register