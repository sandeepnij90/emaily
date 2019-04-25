import React from 'react';
import { connect } from 'react-redux';
import { Fields } from './Fields';
import { sendSurvey } from '../../actions/index';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';

const SurveyReview = ({ formValues, sendSurvey, onCancel, history }) => {
    
    return (
        <div className="survey-form container">
            <h1>Does everything look ok?</h1>
            {Fields.map(({name,label}) => {
                return (
                    <div key={name}>
                        <h4>{label}</h4>
                        <p>{formValues[name]}</p>
                    </div>
                );
            })}
            <div className="buttons">
                <div><Button onClick={onCancel}>Back</Button></div>
                <div><Button onClick={() => sendSurvey(formValues, history)}>Send Survey</Button></div>
            </div>
        
        </div>
    )
}

const mapStateToProps = state => {
    return {
        formValues: state.form.surveyForm.values
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendSurvey: (formValues, history) => dispatch(sendSurvey(formValues,history))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SurveyReview));