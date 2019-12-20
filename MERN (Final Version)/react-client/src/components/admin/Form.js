import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class Form extends Component {

    constructor(props) {

        super(props);

        this.state = {
            number: 1,
            title: '',
            description: '',
            path: 'JavaScript',
            type: 'Concepts',
            url: '',
            demoURL: '',
            lengthHours: 0,
            lengthMinutes: 0
        }

        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePath = this.onChangePath.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeURL = this.onChangeURL.bind(this);
        this.onChangeDemoURL = this.onChangeDemoURL.bind(this);
        this.onChangeLengthHours = this.onChangeLengthHours.bind(this);
        this.onChangeLengthMinutes = this.onChangeLengthMinutes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeNumber(e) {
        this.setState({ number: e.target.value });
    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }
    onChangePath(e) {
        this.setState({ path: e.target.value });
    }
    onChangeType(e) {
        this.setState({ type: e.target.value });
    }
    onChangeURL(e) {
        this.setState({ url: e.target.value });
    }
    onChangeDemoURL(e) {
        this.setState({ demoURL: e.target.value });
    }
    onChangeLengthHours(e) {
        this.setState({ lengthHours: e.target.value });
    }
    onChangeLengthMinutes(e) {
        this.setState({ lengthMinutes: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (window.location.href.includes("/create")) {

            const newCourse = {
                number: this.state.number,
                title: this.state.title,
                description: this.state.description,
                path: this.state.path,
                type: this.state.type,
                url: this.state.url,
                demoURL: this.state.demoURL,
                lengthHours: this.state.lengthHours,
                lengthMinutes: this.state.lengthMinutes
            }

            axios.post("https://localhost:4000/admin/courses/create", newCourse, { params: {}, headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((res) => {
                if (res.data.message === 'Course Saved') {
                    this.setState({
                        number: 1,
                        title: '',
                        description: '',
                        path: 'JavaScript',
                        type: 'Concepts',
                        url: '',
                        demoURL: '',
                        lengthHours: '',
                        lengthMinutes: '',
                        saved: true
                    });
                } else {
                    this.setState({
                        saved: false
                    });
                }
            });
        }

        else if (window.location.href.includes("/edit")) {
            const updatedCourse = {
                number: this.state.number,
                title: this.state.title,
                description: this.state.description,
                path: this.state.path,
                type: this.state.type,
                url: this.state.url,
                demoURL: this.state.demoURL,
                lengthHours: this.state.lengthHours,
                lengthMinutes: this.state.lengthMinutes
            }

            axios.put(`https://localhost:4000/admin/courses/edit/${this.props.courseId}`, updatedCourse, { params: {}, headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } }).then((res) => {
                if (res.data.message === 'Course Updated') {
                    this.setState({
                        updated: true
                    });
                } else {
                    this.setState({
                        updated: false
                    });
                }
            });

        }
    }

    componentDidMount() {

        if (window.location.href.includes("/edit")) {

            axios.get(`https://localhost:4000/admin/courses/edit/${this.props.courseId}`, { params: {}, headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` } })
                .then((res) => {
                    this.setState({
                        number: res.data.number,
                        title: res.data.title,
                        description: res.data.description,
                        path: res.data.path,
                        type: res.data.type,
                        url: res.data.url,
                        demoURL: res.data.demoURL,
                        lengthHours: res.data.lengthHours,
                        lengthMinutes: res.data.lengthMinutes
                    })
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
    render() {
        return (
            <>
                <main>
                    <section id="courses" class="shaded-background">
                        <div class="section-intro-container">
                            <h2 class="section-intro-heading">{window.location.href.includes("/create") ? 'Create Course' : 'Update Course'}</h2>
                        </div>
                        <form id="create-module-form" onSubmit={this.onSubmit}>
                            <div>
                                <fieldset>
                                    <label htmlFor="number">Course Number:</label>
                                    <input type="number" name="number" id="number" value={this.state.number} onChange={this.onChangeNumber} required min="1" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" name="title" id="title" value={this.state.title} onChange={this.onChangeTitle} required pattern="[a-zA-Z0-9\s]+" />
                                    <label htmlFor="description">Description:</label>
                                    <textarea name="description" id="description" value={this.state.description} onChange={this.onChangeDescription} required></textarea>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="url">Video URL:</label>
                                    <input type="text" name="url" id="url" value={this.state.url} onChange={this.onChangeURL} required pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})" />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="path">Select Path:</label>
                                    <select name="path" id="path" value={this.state.path} onChange={this.onChangePath} required>
                                        <option value="JavaScript">JavaScript</option>
                                        <option value="Node">Node</option>
                                        <option value="React">React</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="type">Select Type:</label>
                                    <select name="type" id="type" value={this.state.type} onChange={this.onChangeType} required>
                                        <option value="Concepts">Concepts</option>
                                        <option value="Project">Project</option>
                                    </select>
                                </fieldset>
                                <fieldset>
                                    <p className="label">Course Length:</p>
                                    <input type="number" name="lengthHours" id="lengthHours" className="lengthInput" value={this.state.lengthHours} onChange={this.onChangeLengthHours} min="0" /><label for="lengthHours" className="lengthLabel">Hour(s)</label>
                                    <input type="number" name="lengthMinutes" id="lengthMinutes" className="lengthInput" value={this.state.lengthMinutes} onChange={this.onChangeLengthMinutes} min="0" /><label for="lengthMinutes" className="lengthLabel">Minute(s)</label>
                                    <label htmlFor="demoURL">Project Demo URL:</label>
                                    <input type="text" name="demoURL" id="demoURL" value={this.state.demoURL} onChange={this.onChangeDemoURL} pattern="(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})" />
                                </fieldset>
                            </div>
                            <div style={{display:this.state.hasOwnProperty('saved')?'initial':'none'}}>
                            <p className="flashMessage successMessage" style={{ display: this.state.saved && this.state.saved === true ? 'block' : 'none' }}>Course saved successfully.</p>
                            <p className="flashMessage failureMessage" style={{ display: this.state.saved === false ? 'block' : 'none' }}>Course could not be saved.</p>
                            </div>
                            <div style={{display:this.state.hasOwnProperty('updated')?'initial':'none'}}>
                            <p className="flashMessage successMessage" style={{ display: this.state.updated && this.state.updated === true ? 'block' : 'none' }}>Course updated successfully.</p>
                            <p className="flashMessage failureMessage" style={{ display: this.state.updated === false ? 'block' : 'none' }}>Course could not be updated.</p>
                            </div>
                            <button type="submit" className="button">{window.location.href.includes("/create") ? "Save Course" : "Update Course"}</button>
                            <div style={{display:window.location.href.includes("/create") ? 'inline block' : 'none'}} className="link-wrapper">
                                <Link to="/admin/create" href="/admin/create" onClick={() => window.location.reload()} className="bottom-link"><FontAwesomeIcon className="create-new-course-icon" icon={faPlusCircle} /> Create Another Course</Link>
                            </div>
                        </form>
                    </section>
                </main>

            </>
        );
    }
}

export default Form;