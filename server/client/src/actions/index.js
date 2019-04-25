import { FETCH_USER, FETCH_SURVEYS } from './types';
import 'babel-polyfill';
import axios from 'axios';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
}

export const sendSurvey = (formValues, history) => async dispatch => {
    const res = await axios.post('/api/survey', formValues);
    history.push('/survey');
    dispatch({ type: FETCH_USER, payload: res.data});
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/survey');
    dispatch({type: FETCH_SURVEYS, payload: res.data});
}