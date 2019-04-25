import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Fields } from './Fields';
import SurveyField from './SurveyField';
import {Form, Button, Icon} from 'antd'
import { validateEmails } from './../../utils/validateEmail';
import './surveyForm.scss';

class SurveyForm extends Component {
    renderFields() {
        return Fields.map(({name, label}) => {
            return <Form.Item key={name}><Field  name={name} label={label} component={SurveyField} /></Form.Item>
        })
    }

    render() {
        return (
            <div className="survey-form container">
                <h1>Your survey</h1>
                <Form onSubmit={this.props.handleSubmit(this.props.submitSurvey)}>
                    {this.renderFields()}
                    <div className="buttons">
                    <div><Button>Cancel</Button></div>
                    <div><Button htmlType="submit">Next <Icon type="check"/></Button></div>
                    </div>
                </Form>
            </div>
        )
    }
} 

const validate = values => {
    let errors = {};
    errors.recipients = validateEmails(values.recipients || '');
    Fields.forEach(({name}) => {
        if(!values[name]) errors[name]= 'This is a required field';
    });
    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)