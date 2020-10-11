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