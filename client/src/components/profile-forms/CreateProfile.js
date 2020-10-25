import React,{Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import { createProfile } from "../../actions/profile";
import { connect } from 'react-redux';

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        bio: '',
        githubusername: '',
        skills: []
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        handle,
        company,
        website,
        location,
        status,
        bio,
        githubusername,
        skills
    } = formData;
    const onChange = event => {
        setFormData({...formData, [event.target.name] : event.target.value});
        console.log(status);
    };

    const onSubmit = event => {
        event.preventDefault();
        createProfile(formData, history);

        console.log(formData);
    };

    return (
        <Fragment>
            <h1>Create your profile</h1>
            <p>Let's get some information to make your profile stand out</p>
            <small>* = required field</small>
            <form className={"form"} onSubmit={onSubmit}>
                <div className={"form-group"}>
                    <select
                        name={'status'}
                        value={status}
                        onChange={e => onChange(e)}
                    >
                        <option value={'0'}>* Select Professional Status</option>
                        <option value={'Developer'}>Developer</option>
                        <option value={'Junior Developer'}>Junior Developer</option>
                        <option value={'Senior Developer'}>Senior Developer</option>
                        <option value={'Manager'}>Manager</option>
                        <option value={'Student or Learning'}>Studnt or Learning</option>
                        <option value={'Instructor'}>Instructor or Teacher</option>
                        <option value={'Intern'}>Intern</option>
                        <option value={'Other'}>Other</option>
                    </select>
                    <small className={'form-text'}>
                        Give us an idea of where you are at in your career
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'Handle'}
                        name={'handle'}
                        value={handle}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        Could be your own Handle or one you work for
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'Company'}
                        name={'company'}
                        value={company}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        Could be your own company or one you work for
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'website'}
                        name={'website'}
                        value={website}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        Could be your own or a company website
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'location'}
                        name={'location'}
                        value={location}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        City & state suggested (eg. Boston, Seoul)
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'* Skills'}
                        name={'skills'}
                        value={skills}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'gitHubUserName'}
                        name={'githubusername'}
                        value={githubusername}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        If you want your latest repos and a Github link, include your
                        username
                    </small>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'A short bio of yourself'}
                        name={'bio'}
                        value={bio}
                        onChange={e => onChange(e)}
                    />
                    <small className={'form-text'}>
                        Tell us a little about yourself
                    </small>
                </div>
                <div className={'my-2'}>
                    <button
                        onClick={() => toggleSocialInputs(!displaySocialInputs)}
                        type={'button'}
                        className={'btn btn-light'}
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && (
                    <Fragment>
                        <div className={'form-group social-input'}>
                            <i className={'fab fa-twitter fa-2x'}/>
                            <input
                                text={'text'}
                                placeholder={'Twitter URL'}
                                name={'Twitter'}
                                onChange={ e => onChange(e)}
                            />
                        </div>
                        <div className={'form-group social-input'}>
                            <i className={'fab fa-linkedin fa-2x'}/>
                            <input
                                type={'text'}
                                placeholder={'linked in URL'}
                                name={'linkedin'}
                                onChange={e=> onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}
                <input type={'submit'} className={'btn btn-primary my-1'}/>
                <Link to={"/dashboard"} className={'btn btn-light my-1'}>
                    Go back
                </Link>



            </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(
    null,
    {createProfile}
)(withRouter(CreateProfile))