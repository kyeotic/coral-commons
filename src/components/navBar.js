import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';

@connect(state => ({
    activeUrl: state.routing.location.pathname
}))
class NavLink extends Component {
    render() {
        return (
            <li role={'presentation'} className={this.props.activeUrl == this.props.href ? 'active' : ''}>
                <Link to={this.props.href}>{this.props.label}</Link>
            </li>
        );
    }
}

export default class NavBar extends Component {
    static propTypes = {
        
    }
    constructor(props, ...args) {
        super(props, ...args);
        this.state = {};
    }
	render() {
		return (
            <Navbar inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Coral Commons</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavLink href={'/'} label={'Users'} />
                    <NavLink href={'/residents'} label={'Residents'} />
                </Nav>
            </Navbar>
		);
	}
}