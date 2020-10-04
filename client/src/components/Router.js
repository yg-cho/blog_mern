import React,{Fragment} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Navbar from "./layout/Navbar";
import Landing from "./layout/Landing";
export default () => {
    return (

        <Router>
            <Fragment>
                <Navbar/>
                <Route path={"/"} exact component={Landing} />
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </Fragment>
        </Router>
    )
}