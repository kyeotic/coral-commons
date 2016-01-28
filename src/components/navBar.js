import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router';
import NavLink from 'components/navLink';

export default class NavBar extends Component {
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