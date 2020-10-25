import React,{ Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({createProfile, getCurrentProfile, profile:{profile, loading}, history}) => {
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

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            handle: loading || !profile.handle ? '' : profile.handle,
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio
        });
    }, [loading]);

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
            <h1 className={'large text-primary'}>Create Your Profile</h1>
            <p className={'lead'}>
                <i className={'fas fa-user'}/> Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className={'form'} onSubmit={e => onSubmit(e)}>
                <div className={'form-group'}>
                    <select name={'status'} value={status} onChange={e => onChange(e)}>
                        <option value={'0'}>* Select Professional Status</option>
                        <option value={'Developer'}>Developer</option>
                        <option value={'Junior Developer'}>Junior Developer</option>
                        <option value={'Senior Developer'}>Senior Developer</option>
                        <option value={'Manager'}>Manager</option>
                        <option value={'Student or Learning'}>Student or Learning</option>
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
                        placeholder={'Website'}
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
                            placeholder={'Location'}
                            name={'location'}
                            value={location}
                            onChange={e => onChange(e)}
                        />
                        <small className={'from-text'}>
                            City & state suggested (eg. Boston, MA)
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
                            placeholder={'Github Username'}
                            name={'githubusername'}
                            value={githubusername}
                            onChange={e => onChange(e)}
                        />
                        <small className={'form-text'}>
                            If you want your latest repos and a Github link, include your username
                        </small>
                </div>
                    <div className={'form-group'}>
                        <textarea
                            placeholder={'A short bio of yourself'}
                            name={'bio'}
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                        <small className={'form-text'}>Tell us a little about yourself</small>
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
                                type={'text'}
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
                <input type={'submit'} className={'btn btn-primary my-1'} value={'Update'}/>
                <Link to={"/dashboard"} className={'btn btn-light my-1'}>
                    Go back
                </Link>
            </form>
        </Fragment>
    );
};

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
) (withRouter(EditProfile));