import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
            // localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                token: localStorage.setItem('token', payload.token),
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }
}