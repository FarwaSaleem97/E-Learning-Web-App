import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faCheckSquare, faMedal } from '@fortawesome/free-solid-svg-icons'

class Course extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            URL: "",
            completed: false
        }
        this.markComplete = this.markComplete.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/student/courses/watch/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((response) => {
            const url = response.data;
            this.setState({ 
                URL: url
            });
        }).catch((error) => {   
            console.log(`Following error was encountered: ${error}`);
        });
    }
    
    markComplete() {
        const courseID = this.props.match.params.id;
        this.props.auth.getProfile((profile, err) => {
           if (courseID && profile) {
               const progress = {
                   studentID: profile.sub,
                   courseID: courseID
               }
               axios.post("http://localhost:4000/student/markprogress", progress, { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then(this.setState({
                   completed: true
               }));
           }
        });
    }

    render() {
        return (
            <>
                <main>
                    <section id="video-player-container">
                        <iframe src={this.state.URL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                </main>
                <main>
                    <section id="video-player-container">
                        <iframe src={this.state.URL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </section>
                </main>
                <footer id="module-page-footer">
                    <Link to="/courses" href="/courses"><FontAwesomeIcon className="back-icon" icon={faAngleLeft} /> Courses</Link>
                    <button style={{ display: this.state.completed === false && !this.props.auth.isAdmin() ? 'initial' : 'none' }} onClick={this.markComplete}><FontAwesomeIcon className="mark-complete-icon" icon={faCheckSquare} />  Mark As Complete</button>
                    <p className="completed" style={{ display: this.state.completed === true ? 'initial' : 'none' }}><FontAwesomeIcon className="show-completed-icon" icon={faMedal} /> Completed</p>
                </footer>
            </>
        );
    }

}

export default Course;