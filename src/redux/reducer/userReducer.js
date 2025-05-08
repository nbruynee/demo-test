import { DECREMENT } from '../action/counterAction';
import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS, USER_UPDATE_SUCCESS } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        access_token: "",
        refresh_token: "",
        username: "",
        role: "",
        image: "",
        email: "",
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log("Check actions:", action)
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    image: action?.payload?.DT?.image,
                    email: action?.payload?.DT?.email
                },
                isAuthenticated: true,
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: "",
                    refresh_token: "",
                    username: "",
                    role: "",
                    image: "",
                    email: "",
                },
                isAuthenticated: false
            };

        case USER_UPDATE_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    ...action.payload
                },
            };
        default: return state;
    }
};

export default userReducer;