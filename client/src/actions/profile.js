import axios from 'axios';
import { setAlert} from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/profile/me');
        console.log("res",res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        console.log(res.data);
    } catch(err) {
        dispatch({
            type:PROFILE_ERROR
        });
    }
};

export const createProfile= (
    formData,
    history,
    edit = false
    ) => async dispatch => {
    try{
        const config = {
            headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : localStorage.getItem("token")
            }
        };

        const res = await axios.post('/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if(!edit) {
            history.push('/dashboard');
        }
    }catch(err){
        const errors = err.response.data.errors;

        if(errors){
            dispatch(setAlert(errors.msg, 'danger'));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

}