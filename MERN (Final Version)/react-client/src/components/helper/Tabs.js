import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faClock, faAngleRight, faEdit, faMedal, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Course extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            completed: false
        }
        this.checkProgress = this.checkProgress.bind(this);
    }

    checkProgress() {
        const courseID = this.props.course._id;
        const studentID = this.props.studentID;
        if (courseID && studentID) {
            const progress = {
                studentID,
                courseID
            }
        axios.post("http://localhost:4000/student/checkprogress", progress, { params: {}, headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((res) => {
                if (res.data.message && res.data.message.studentID === studentID && res.data.message.courseID === courseID) {
                    this.setState({
                        completed: true
                    });
                }
            });
        }
    }

    componentDidMount() {
        this.checkProgress();
    }

    componentDidUpdate() {
        this.checkProgress();
    }

    render() {
        const { isAdmin } =  this.props.auth;
        return (
            <div className="module">
                <div className="info-container-top">
                    <FontAwesomeIcon style={{ display: isAdmin() || this.state.completed === true ? 'none' : 'initial' }} className="info-container-player-icon" icon={faPlayCircle} />
                    <FontAwesomeIcon style={{ display: this.state.completed === true ? 'initial' : 'none' }} className="show-completed-icon" icon={faMedal} />
                    <div style={{ display: isAdmin() ? 'inital' : 'none' }}>
                        <Link to={`/admin/courses/edit/${this.props.course._id}`} href={`/admin/courses/edit/${this.props.course._id}`}><FontAwesomeIcon className="icon info-container-edit-icon" icon={faEdit} /></Link>
                        <button onClick={() => this.props.onDelete(this.props.course._id, this.props.course.title)}><FontAwesomeIcon className="icon info-container-delete-icon" icon={faTrashAlt} /></button>
                    </div>
                    <p>{this.props.course.type}</p>
                </div>
                <div className="module-details">
                    <h3>{this.props.course.title}</h3>
                    <p>{this.props.course.description}</p>
                </div>
                <div className="info-container-bottom">
                    <p><FontAwesomeIcon className="info-container-clock-icon" icon={faClock} />{this.props.course.lengthHours} Hr. {this.props.course.lengthMinutes} Mins.</p>
                    <a href={this.props.course.demoURL} style={{ display: this.props.course.type === 'Project' ? "initial" : "none" }} className="view-demo-link" target="_blank" rel="noopener noreferrer">View Demo <FontAwesomeIcon className="video-demo-icon" icon={faAngleRight} /></a>
                    <Link style={{ display: isAdmin() ? 'none' : 'initial' }} to={`/courses/watch/${this.props.course._id}`} href={`/courses/watch/${this.props.course._id}`} className="button button-pink-outline">Start <FontAwesomeIcon className="start-button-icon" icon={faAngleRight} /></Link>
                    <Link style={{ display: isAdmin() ? 'inital' : 'none' }} to={`/courses/watch/${this.props.course._id}`} href={`/courses/watch/${this.props.course._id}`} className="button button-pink-outline">Preview <FontAwesomeIcon className="start-button-icon" icon={faAngleRight} /></Link>
                </div>
            </div>
        );
    }

}

class Tabs extends Component {

    constructor(props) {
        super(props);
        this.jsCourseList = this.jsCourseList.bind(this);
        this.nodeCourseList = this.nodeCourseList.bind(this);
        this.reactCourseList = this.reactCourseList.bind(this);
    }

    displayTab(tabID, event) {

        const links = document.querySelectorAll('.link');
        const tabs = document.querySelectorAll('.tab');

        for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
        }

        document.getElementById(tabID).style.display = "flex";

        for (let j = 0; j < links.length; j++) {
            links[j].classList.remove("active");
        }
        event.currentTarget.classList.add("active");

    }

    jsCourseList() {
        return this.props.jsCourses.map((currentCourse) => {
            return <Course auth={this.props.auth} course={currentCourse} key={currentCourse._id} onDelete={this.props.deleteHandlerForChild} studentID={this.props.studentID}/>
        });
    }

    nodeCourseList() {
        return this.props.nodeCourses.map((currentCourse) => {
            return <Course auth={this.props.auth} course={currentCourse} key={currentCourse._id} onDelete={this.props.deleteHandlerForChild} studentID={this.props.studentID}/>
        });
    }

    reactCourseList() {
        return this.props.reactCourses.map((currentCourse) => {
            return <Course auth={this.props.auth} course={currentCourse} key={currentCourse._id} onDelete={this.props.deleteHandlerForChild} studentID={this.props.studentID}/>
        });
    }

    componentDidMount() {
        const defaultLink = document.querySelector("#default");
        defaultLink.click();
    }


    render() {
        return (
            <>
                <div id="modules-tab-container">
                    <button class="link active" id="default" onClick={this.displayTab.bind(this, 'js-modules')}>JavaScript</button>
                    <button class="link" onClick={this.displayTab.bind(this, 'node-modules')}>Node</button>
                    <button class="link" onClick={this.displayTab.bind(this, 'react-modules')}>React</button>
                </div>
                <div id="modules-container">
                    <div class="tab modules-list" id="js-modules">
                        {this.jsCourseList()}
                    </div>
                    <div class="tab modules-list" id="node-modules">
                        {this.nodeCourseList()}
                    </div>
                    <div class="tab modules-list" id="react-modules">
                        {this.reactCourseList()}
                    </div>
                </div>
            </>
        );
    }
}

export default Tabs;