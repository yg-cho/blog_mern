import React,{Fragment} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "../components/layout/Alert";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
import Dashboard from "./dashboard/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./profile-forms/CreateProfile";
import EditProfile from "./profile-forms/EditProfile";
import AddEducation from "./profile-forms/AddEducation";
import AddExperience from "./profile-forms/AddExperience";

export default () => {
    return (

        <Router>
            <Fragment>
                <Navbar/>
                <Route path={"/"} exact component={Landing} />
                <section className='container'>
                    <Alert/>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/signup" exact component={Signup} />
                        <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                        <PrivateRoute path="/create-profile" exact component={CreateProfile}/>
                        <PrivateRoute path="/edit-profile" exact component={EditProfile}/>
                        <PrivateRoute path="/add-experience" exact component={AddExperience}/>
                        <PrivateRoute path="/add-education" exact component={AddEducation}/>
                    </Switch>
                </section>
            </Fragment>
        </Router>
    )
}