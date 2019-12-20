
import React, { Component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


class Edit extends Component{
render(){
    return(
        <>
            <Form courseId={this.props.match.params.id} auth={this.props.auth}/>
            <footer id="home-page-footer">
                    <p><Link to="/" href="/">stacklearner.com</Link> &copy; 2019</p>
                    <p>Made with <FontAwesomeIcon className="heart-icon" icon={faHeart} /> in Multan</p>
                    <p><Link to="/" href="/">About Us</Link> &middot; <Link to="/" href="/">Contact Us</Link> &middot; <Link to="/" href="/">Privacy Policy</Link></p>
                </footer>

        </>
    )
}
}
export default Edit;