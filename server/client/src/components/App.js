import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import SurveyThanks from './survey/Thanks';
import Dashboard from './survey/Dashboard';
import SurveyNew from './survey/SurveyNew';
import Landing from './Landing';
import Credits from './errors/Credits';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <Header />
                    <Route exact path={'/survey/thanks'} component={SurveyThanks} />
                    <Route exact path={'/survey'} component={Dashboard} />
                    <Route exact path={'/survey/new'} component={SurveyNew} />
                    <Route exact path={'/error/funds'} component={Credits} />
                    <Route exact path={'/'} component={Landing} />
                </Fragment>
            </BrowserRouter>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUser: () => dispatch(fetchUser())
    }
}

export default connect(null,mapDispatchToProps)(App);