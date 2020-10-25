import React,{Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: '',
            description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;
    const onChange = event => {
        setFormData({...formData, [event.target.name] : event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        console.log(formData);
        //addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className={'large text-primary'}>Add your Education</h1>
            <p className={'lead'}>
                <i className={'fas fa-code-branch'}/> Add any school or bootcamp that you have attended
            </p>
            <small> * = required field </small>
            <form className={'form'} onSubmit={onSubmit}>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'* School or Bootcamp'}
                        name={'school'}
                        value={school}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'* Degree or Certificate'}
                        name={'degree'}
                        value={degree}
                        onChange={e => onChange(e)}
                        require
                    />
                </div>
                <div className={'form-group'}>
                    <input
                        type={'text'}
                        placeholder={'fieldofstudy'}
                        name={'fieldofstudy'}
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className={'form-group'}>
                    <input
                        type={'date'}
                        placeholder={'from'}
                        name={'from'}
                        value={from}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className={'form-group'}>
                    <p>
                        <input
                            type={'checkbox'}
                            name={'current'}
                            checked={current}
                            value={current}
                            onChange={e => {
                                setFormData({...formData, current: !current});
                                toggleDisabled(!toDateDisabled);
                            }}
                        />{' '}
                        Current Job
                    </p>
                </div>
                <div className={'form-group'}>
                    <input
                        type={'date'}
                        placeholder={'to'}
                        name={'to'}
                        value={to}
                        onChange={e => onChange(e)}
                        disabled={toDateDisabled ? 'disabled' : ''}
                    />
                </div>
                <div className={'form-group'}>
                    <textarea
                        name={'description'}
                        cols={'30'}
                        rows={'5'}
                        placeholder={'Program Description'}
                        value={description}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type={'submit'} className={'btn btn-primary my-1'} value={'Update'}/>
                <Link to={"/dashboard"} className={'btn btn-light my-1'}>
                    Go back
                </Link>
            </form>
        </Fragment>
    );
};

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
};

export default connect(
    null,
)(withRouter(AddEducation));