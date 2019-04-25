import React from 'react';
import { Input } from 'antd';

const SurveyField = ({name, input, label, meta: {error, touched, active}}) => {    
    return (
        <div>
            <Input type="input" name={name} placeholder={label} size="large" {...input} />
            <div style={{color: 'red', lineHeight: '1'}}>{touched && !active && error}</div>
        </div>
    )
}

export default SurveyField;