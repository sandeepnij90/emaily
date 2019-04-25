import { Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { Card } from 'antd';

class Dashboard extends Component {

    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.map(({title, subject, body, yes, no}, index) => {
            return <Card
                key={index}
                title={title}
                style={{marginBottom:"20px"}}>
                <p>{subject}</p>
                <p>{body}</p>
                <p>yes: {yes} no: {no}</p>
            </Card>
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Dashboard</h1>
                {this.renderSurveys()}
                <Link to="/survey/new"><Button type="primary" shape="circle" icon="plus" size={'large'} /></Link>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSurveys: () => dispatch(fetchSurveys())
    }
}
    
const mapStateToProps = state => {
    return {
        surveys: state.survey
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard);