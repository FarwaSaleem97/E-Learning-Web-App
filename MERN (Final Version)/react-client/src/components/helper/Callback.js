import React, { Component } from 'react';

class Callback extends Component {
    componentDidMount() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        }
        else {
            throw new Error("Invalid callback URL");
        }
    }
    render() {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
}

export default Callback;