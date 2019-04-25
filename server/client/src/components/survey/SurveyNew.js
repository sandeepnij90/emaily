import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyReview';

class SurveyNew extends Component {

    constructor() {
        super();
        this.state = {
            showReview: false
        }
        this.toggleReview = this.toggleReview.bind(this);
    }

    toggleReview() {     
        this.setState({showReview: !this.state.showReview});
    }

    renderView() {
        if (this.state.showReview) {
            return <SurveyReview onCancel={this.toggleReview}/>
        } 
        return <SurveyForm submitSurvey={this.toggleReview} />
    }

    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        );
    }
}

export default SurveyNew;