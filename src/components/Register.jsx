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
    }

    .reg-right {
        width: 50%;
    }

    .bottom-section {
        display: flex;
        flex-direction: column;
    }

    .text-input-container {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }

    .asterisk {
        color: red;
        font-size: 1.5rem;
    }

    .input-textfield {
        width: 85%;
        height: 1.5rem;
        border-radius: .5rem;
    }



/* tentative custom checkbox styles */
/* 
.checkbox-container input {
    opacity: 1;
    cursor: pointer;
    height: 25px;
    width: 25px;
}

.custom-checkmark-div {
    border: 2px solid blue;
    display: flex;
    justify-content: center;

}

.custom-checkmark {
    border: 4px solid blue;
    height: 25px;
    width: 25px;
    background-color: red;
} */

/* END checkbox styles */

.errors {
    display: flex;
    flex-direction: column;
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
#reg-button {
    background-color: #e07a5f;
    padding: 5px 15px;
    border-radius: 5px;
    border-color: #e07a5f;
    margin-top: 1rem;
    color: #f4f1de;
    font-size: 1.1rem;
    }

.cancel-button {
    display: flex;
    justify-content: flex-end;
}

#cancel-button {
    background-color: #e07a5f;
    padding: 5px 15px;
    border-radius: 5px;
    border-color: #e07a5f;
    color: #f4f1de;
    font-size: 0.7rem;
}

`

//END OF STYLES



const Register = props => {

    const {
        values,
        errors,
        disabled,
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
                                    placeholder='Create New Password'
                                    value={values.password}
                                    onChange={changeHandler}
                                />
                            </div>

                            <h6>Must be minimum of 8 characters.</h6>
                        </label>
                    </div>
                </div>

                <div className='bottom-section'>
                    <div className='terms-group'>
                        <div className='terms-link'>
                            <a href='Register' onClick={(e) => e.preventDefault()}>Read Terms</a>
                        </div>

                        <label htmlFor='terms' className='checkbox-container'>
                            <h4><span className='asterisk'>* </span>Accept Terms</h4>
                            <div className='custom-checkmark-div'>
                                <span className='custom-checkmark'></span>
                            </div>
                            <input
                                type='checkbox'
                                name='terms'
                                checked={values.terms}
                                onChange={checkboxHandler}
                            />
                        </label>
                    </div>

                    <div className='errors'>
                        <h6>* Required</h6>
                        <div>{errors.username}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.terms}</div>
                    </div>

                    <div className='regform-buttons'>
                        <div class='reg-button'>
                            <button id='reg-button' disabled={disabled}>Register!</button>
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