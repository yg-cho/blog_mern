import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {

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
    }

    console.log(formData);

    axios
        .post('http://localhost:5000/users/login',formData)
        .then(result => console.log(result))
        .catch(err => console.log(err));

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

export default Login;