import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getCurrentProfile} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
   getCurrentProfile,
   auth: {user},
   profile: {profile, loading}
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return (
        loading && profile === null
            ? (
                <Spinner/>
            ) : (
                <Fragment>
                    <h1 className={'large text-primary'}>DashBoard</h1>
                    <p className={'lead'}>
                        <i className={'fas fa-user'}/>Welcome { user && user.name}
                    </p>
                    {profile !== null
                        ? (
                            <Fragment>
                                <DashboardActions/>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p>You have not yet setup a profile, please add some info</p>
                                <Link to={'/create-profile'} className={'btn btn-primary my-1'}>
                                    Create Profile
                                </Link>
                            </Fragment>
                        )
                    }
                </Fragment>
            )
    );
};

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile }
)(Dashboard);