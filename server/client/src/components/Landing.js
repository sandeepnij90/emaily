import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Landing extends Component {

    componentDidUpdate() {
        const { history } = this.props;

        if (this.props.auth) {
            history.push('/survey');
        }
    }
    render() {
        return (
            <div className="container" style={{textAlign: 'center'}}>
                <h1>Emaily</h1>
                <h2>The emailing survey tool</h2>
                <p><a href="/auth/google">Sign up</a> now to create your own surveys</p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default withRouter(connect(mapStateToProps)(Landing));