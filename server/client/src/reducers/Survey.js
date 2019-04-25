import { FETCH_SURVEYS } from '../actions/types';

export const Survey = (state = [], action) => {
    
    switch(action.type) {
        case FETCH_SURVEYS: {
            return action.payload
        }
        default: return state
    }
}