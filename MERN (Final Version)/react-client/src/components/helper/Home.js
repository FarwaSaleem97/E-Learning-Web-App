import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {
    render() {
        const { isAuthenticated, login } = this.props.auth;
        return (
            <>
                <main>
                    <section class="intro-container" id="home-intro-container">
                        <h1 class="intro-heading">Learn full stack JavaScript</h1>
                        <p class="lead-paragraph">Learn modern JavaScript, Node, and React through real world projects</p>
                        <Link onClick={login} class="button button-primary button-large">Start Learning <FontAwesomeIcon className="start-button-icon" icon={faAngleRight} /></Link>
                        <a href="#paths" class="button button-white-outline button-large-outline">Explore Paths</a>
                    </section>
                    <section id="icon-container">
                        <i class="devicon-javascript-plain"></i>
                        <i class="devicon-nodejs-plain-wordmark"></i>
                        <i class="devicon-react-original-wordmark"></i>
                        <i class="devicon-mongodb-plain-wordmark"></i>
                    </section>
                    <section id="paths" class="shaded-background">
                        <div class="section-intro-container">
                            <h2 class="section-intro-heading">Paths</h2>
                            <p class="section-lead-paragraph">Dedicated learning paths, made up of projects and conceptual courses</p>
                        </div>
                        <div id="courses-container">
                            <Link style={{ display: !isAuthenticated() ? "initial" : "none" }} onClick={login} class="course-container">
                                <i class="devicon-javascript-plain colored"></i>
                                <h3>JavaScript</h3>
                                <div class="inner-container">
                                    <p>6 Modules &middot; 4 Projects<FontAwesomeIcon className="caret-icon" icon={faCaretRight} /></p>
                                </div>
                            </Link>
                            <Link style={{ display: isAuthenticated() ? "inital" : "none" }} to="/courses" href="/courses" class="course-container">
                                <i class="devicon-javascript-plain colored"></i>
                                <h3>JavaScript</h3>
                                <div class="inner-container">
                                    <p>6 Modules &middot; 4 Projects<FontAwesomeIcon className="caret-icon" icon={faCaretRight} /></p>
                                </div>
                            </Link>
                            <Link onClick={login} class="course-container">
                                <i class="devicon-nodejs-plain colored"></i>
                                <h3>Node</h3>
                                <div class="inner-container">
                                    <p>6 Modules &middot; 2 Projects<FontAwesomeIcon className="caret-icon" icon={faCaretRight} /></p>
                                </div>
                            </Link>
                            <Link onClick={login} class="course-container">
                                <i class="devicon-react-original colored"></i>
                                <h3>React</h3>
                                <div class="inner-container">
                                    <p>6 Modules &middot; 3 Projects<FontAwesomeIcon className="caret-icon" icon={faCaretRight} /></p>
                                </div>
                            </Link>
                        </div>
                    </section>
                </main>
                <footer id="home-page-footer">
                    <p><Link to="/" href="/">stacklearner.com</Link> &copy; 2019</p>
                    <p>Made with <FontAwesomeIcon className="heart-icon" icon={faHeart} /> in Multan</p>
                    <p><Link to="/" href="/">About Us</Link> &middot; <Link to="/" href="/">Contact Us</Link> &middot; <Link to="/" href="/">Privacy Policy</Link></p>
                </footer>
            </>
        );
    }
}

export default Home;