import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Tabs from '../../components/helper/Tabs';

class Preview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jsCourses: [],
            nodeCourses: [],
            reactCourses: [],
            studentID: ''
        }
        this.deleteCourse = this.deleteCourse.bind(this);
        this.getStudentID = this.getStudentID.bind(this);
        
    }

    componentDidMount() {
        axios.get('http://localhost:4000/student/courses', { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((response) => {
            const courses = response.data;
            console.log(courses);
            this.setState({ 
                jsCourses: courses.filter(course => course.path === 'JavaScript'),
                nodeCourses: courses.filter(course => course.path === 'Node'),
                reactCourses: courses.filter(course => course.path === 'React'),
            });
        }).catch((error) => {   
            console.log(`Following error was encountered: ${error}`);
        });
        this.getStudentID();
    }

    getStudentID() {
        this.props.auth.getProfile((profile, err) => {
            let subscriberID = profile.sub;
            console.log(subscriberID);
            this.setState({
                studentID: subscriberID
            });
        });
    }

    deleteCourse(courseID, courseTitle) {
        axios.delete(`http://localhost:4000/admin/courses/delete/${courseID}`, { headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((res) => {
            if (res.data.message && res.data.message === 'Course Deleted') {
                const result = window.confirm(`Do you want to delete the ${courseTitle} course ?`);
                if (result === true) {
                    const jsCourses = this.state.jsCourses.filter(course => course._id !== courseID );
                    const nodeCourses = this.state.nodeCourses.filter(course => course._id !== courseID );
                    const reactCourses = this.state.reactCourses.filter(course => course._id !== courseID );
                    this.setState({
                        jsCourses: jsCourses,
                        nodeCourses: nodeCourses,
                        reactCourses: reactCourses
                    });
                }
            }
        }).catch((error) => {
            console.log(`Following error was encountered: ${error}`);
        });
    }

    render() {
        return (
            <>
                <main>
                    <section id="courses" class="shaded-background">
                        <div class="section-intro-container">
                            <h2 class="section-intro-heading">Courses</h2>
                            <p class="section-lead-paragraph">Select a path, and start learning with hands-on projects and conceptual courses</p>
                        </div>
                        <Tabs auth={this.props.auth} jsCourses={this.state.jsCourses} nodeCourses={this.state.nodeCourses} reactCourses={this.state.reactCourses} deleteHandlerForChild={this.deleteCourse} studentID={this.state.studentID}/>
                    </section>
                </main>
                <footer>
                    <p><a href="/">stacklearner.com</a> &copy; 2019</p>
                    <p>Made with <FontAwesomeIcon className="heart-icon" icon={faHeart} /> in Multan</p>
                    <p><a href="/">About Us</a> &middot; <a href="/contact-us">Contact Us</a> &middot; <a href="/privacy">Privacy Policy</a></p>
                </footer>
            </>
        );
    }
}

export default Preview;