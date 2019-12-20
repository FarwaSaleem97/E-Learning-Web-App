import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from './authentication/Auth';

import Nav from './components/helper/Nav';
import Home from './components/helper/Home';

import Courses from './components/student/Courses';
import Course from './components/student/Course';
import Create from './components/admin/Create';
import Edit from './components/admin/Edit';
import Callback from './components/helper/Callback';

class App extends Component {

  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <>
        <Nav auth={this.auth} />
        <Route exact path="/" render={(props) => <Home auth={this.auth} {...props}/>} />      
        <Route exact path="/courses" render={(props) => this.auth.isAuthenticated() ? <Courses auth={this.auth} {...props} /> : <Redirect to="/" />} />
        <Route exact path="/courses/watch/:id" render={(props) => this.auth.isAuthenticated() ? <Course auth={this.auth} {...props} /> : <Redirect to="/" />} />
        <Route exact path="/admin/create/" render={props => this.auth.isAdmin() && this.auth.isAuthenticated() ? <Create auth={this.auth} {...props} /> : <Redirect to="/" />} />
        <Route exact path="/admin/courses/edit/:id" render={props => this.auth.isAdmin() && this.auth.isAuthenticated() ? <Edit auth={this.auth} {...props} /> : <Redirect to="/" />} />
        <Route path="/callback" render={props => <Callback auth={this.auth} {...props} />} />
    </>
    );
  }

}

export default App;
