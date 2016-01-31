import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, MenuItem, NavDropdown, Glyphicon, Button} from 'react-bootstrap';
import { Link } from 'react-router';
import NavLink from 'components/navLink';

import { logout } from 'actions/auth'
import { toggleCollapse } from 'actions/navigation'

@connect(state => ({
    userEmail: state.auth.get('email'),
    isCollapseExpanded: state.navigation.get('isCollapseExpanded')
}), { logout, toggleCollapse })
export default class NavBar extends Component {
    static propTypes = {
        isCollapseExpanded: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        toggleCollapse: PropTypes.func.isRequired
    }
	render() {
		return (
            <Navbar inverse fluid expanded={this.props.isCollapseExpanded} onToggle={this.props.toggleCollapse}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Coral Commons</a>
                    </Navbar.Brand>
                    <Navbar.Toggle  />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavLink href={'/'} label={'Residents'} />
                        <NavLink href={'/houses'} label={'Houses'} />
                        <NavLink href={'/users'} label={'Users'} />
                    </Nav>
                    <Nav pullRight>
                        <NavDropdown title={this.props.userEmail}>
                            <MenuItem><NavLink href={'/profile'} label={'Profile'} /></MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={this.props.logout}><Glyphicon glyph={'log-out'}/> Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
		);
	}
}