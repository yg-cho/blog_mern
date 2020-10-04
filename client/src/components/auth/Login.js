import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import PropTypes from 'prop-types';

const Login = ({setAlert, login}) => {

    const [formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("email ==",formData);
        if(email === "" || password === ""){
            setAlert('Please Check input Status', 'danger');
        }
        login({email, password});

    }

    return (
        <Fragment>
            <h1 className={"large text-primary"}>Login</h1>
            <p className={"lead"}>
               <i className={"fas fa-user"}/> Login your Account
            </p>
            <form className={"form"} onSubmit={onSubmit}>
                <div className={"form-group"}>
                    <input
                        type={"email"}
                        placeholder={"Insert your Email"}
                        name={"email"}
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div className={"form-group"}>
                    <input
                        type={"password"}
                        placeholder={"Confirm your password"}
                        name={"password"}
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input
                    type={"submit"}
                    className={"btn btn-primary"}
                    value={"Login"}
                />
            </form>
            <p className={"my-1"}>
                Signup <Link to={"/signup"}>here</Link>
            </p>
        </Fragment>
    );
};
Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

export default connect(
    null,
    { setAlert, login }
)(Login);