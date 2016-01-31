import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(state => ({
    activeUrl: state.routing.location.pathname
}))
export default class NavLink extends Component {
    render() {
        return (
            <li role={'presentation'} className={this.props.activeUrl == this.props.href ? 'active' : ''}>
                <Link to={this.props.href}>{this.props.label}</Link>
            </li>
        );
    }
}