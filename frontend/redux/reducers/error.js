import {validationError} from './types'


const errorReducer = (state = {error: false}, action) => {
    switch (action.type) {
        case validationError:
            return {};
        default:
            return {...state};
    }
};

export default errorReducer;