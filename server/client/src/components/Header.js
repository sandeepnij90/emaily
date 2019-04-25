import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header } = Layout;
import { connect } from 'react-redux';
import Payments from './Payments';

class HeaderComponent extends Component {

    renderNav() {
        switch(this.props.auth) {
            case null: return;
            case false: return <Menu.Item key="1"><a href="/auth/google">Login</a></Menu.Item>
            default: return [<Menu.Item key="0"><Payments /></Menu.Item>,<Menu.Item  key="1" disabled={true}>Credits: {this.props.auth.credits}</Menu.Item>, <Menu.Item key="2"><a href="/api/logout">logout</a></Menu.Item>]
        }
    }

    render() {
        return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', float:'right' }}
                selectable={false}
            >
                {this.renderNav()}
            </Menu>
        </Header>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(HeaderComponent);