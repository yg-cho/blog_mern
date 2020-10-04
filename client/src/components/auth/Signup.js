import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();

        if(password !== password2) {
            alert('Password do not match');
        }
        console.log(formData);
        // Server Connect
        axios
            .post('http://localhost:5000/users/register', formData)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }



    return (
        <Fragment>
            <div className={"container"}>
                <div clasName={"row"}>
                    <div className={"col-md-8 m-auto"}>
                        <h1 className={"large text-primary"}>Sign Up</h1>
                        <p className={"lead"}>
                            <i className={"fas fa-user"}/> Create Your Account
                        </p>
                        <form className={"form"} onSubmit={onSubmit}>
                            <div className={"form-group"}>
                                <input
                                    type={"text"}
                                    placeholder={"name"}
                                    name={"name"}
                                    value={name}
                                    onChange={onChange}

                                />
                            </div>
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
                                    placeholder={"Insert your password"}
                                    name={"password"}
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                            <div className={"form-group"}>
                                <input
                                    type={"password"}
                                    placeholder={"Confirm your password"}
                                    name={"password2"}
                                    value={password2}
                                    onChange={onChange}
                                />
                            </div>
                            <input
                                type={"submit"}
                                className={"btn btn-primary"}
                                value={"Register"}
                            />
                        </form>
                        <p className={"my-1"}>
                            Already have an Account? <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Signup;