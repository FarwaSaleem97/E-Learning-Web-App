import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
    render() {
        const {isAuthenticated, isAdmin, login, logout} = this.props.auth;
        return (
            <header>
                <nav>
                    <Link to="/" href="/" className="logo" id="main-logo"><span className="logo-icon-wrapper"><FontAwesomeIcon className="logo-icon" icon={faTerminal} /></span>stacklearner</Link>
                    <ul style={{ display: !isAuthenticated() ? "initial" : "none" }}>
                        <li><a href="#paths">Paths</a></li>
                        <li><Link onClick={isAuthenticated() ? logout : login} className="button button-pink-outline button-small">{isAuthenticated() ? "Sign Out" : "Sign In / Sign Up"}</Link></li>
                    </ul>
                    <ul style={{ display: isAuthenticated() && !isAdmin() ? "initial" : "none" }}>
                        <li><Link onClick={isAuthenticated() ? logout : login} className="button button-pink-outline button-small">{isAuthenticated() ? "Sign Out" : "Sign In / Sign Up"}</Link></li>
                    </ul>
                    <ul style={{ display: isAuthenticated() && isAdmin() ? "initial" : "none" }}>
                        <li><Link to="/courses" href="/courses">Courses</Link></li>
                        <li><Link to="/admin/create" href="/admin/create"><FontAwesomeIcon className="create-icon" icon={faPlusCircle} /> Create</Link></li>
                        <li><Link onClick={isAuthenticated() ? logout : login} className="button button-pink-outline button-small">{isAuthenticated() ? "Sign Out" : "Sign In / Sign Up"}</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Nav;