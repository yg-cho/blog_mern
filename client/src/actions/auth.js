import axios from 'axios';
import { setAlert} from "./alert";
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS } from "./types";

export const register = ({name, email, password, password2}) => async dispatch => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password, password2});

    await axios
        .post('/users/register', body, config)
        .then(res => {
            console.log("12313 === ",res.data.password);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            if(res.data.email && res.data.password) {
                setAlert(res.data.password, "danger");
            }
        })
        .catch(err => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
            dispatch({
                type: REGISTER_FAIL
            });
        });

    // try{
    //     const res = await axios.post('/users/register',body, config);
    //     dispatch({
    //         type: REGISTER_SUCCESS,
    //         payload: res.data
    //     });
    //     console.log(res.data);
    // } catch(err) {
    //     const errors = err.response.data.errors;
    //     console.log("+++++++++++++++++++",errors);
    //     if (errors) {
    //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    //
    //     }
    //
    //     dispatch({
    //         type: REGISTER_FAIL
    //     });
    // }

};

export const login = ({email, password}) => async dispatch => {

};