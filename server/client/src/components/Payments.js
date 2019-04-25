import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { handleToken } from '../actions';
import { connect } from 'react-redux';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout name="emaily" description="5 credits for $5" stripeKey={process.env.STRIPE_KEY} amount={500} token={token => this.props.handleToken(token)}>
                <span>Add credits</span>
            </StripeCheckout>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleToken: token => dispatch(handleToken(token))
    }
}

export default connect(null, mapDispatchToProps)(Payments);