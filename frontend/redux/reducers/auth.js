import {loginUser, registerUser} from './types'



const authReducer = (state = {isloggedin: false}, action) => {
    switch (action.type) {
        case loginUser:
            return {};
        case registerUser:
            return {};
        default:
            return {...state};
    }
};

export default authReducer;