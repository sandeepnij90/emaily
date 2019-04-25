import { Auth } from './Auth';
import { Survey } from './Survey';
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

export const Reducer = combineReducers({
    auth: Auth,
    form: reduxForm,
    survey: Survey
})