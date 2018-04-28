import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';

class Login extends Component {

    constructor(props){
        super(props);
        this.state ={
            user_id: 0,
            username: '',
            password: '',
            errorMessage: '',
            fireRedirect: false
        };
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios('/auth/login', {
            method: 'POST',
            data: {
                username: this.state.username,
                password: this.state.password,
            },
        })
        .then(res => {
          if (res.data.auth) {
            cookies.set('user_id', res.data.user.id);
            this.setState({
              user_id: res.data.user.id,
              fireRedirect: true,
            });
          } else {
            this.setState({
              errorMessage: 'Invalid login, please try again.'
            });
          }
        })
        .catch(err => {
          console.log('in error',err);
        });
      e.target.reset();
    }


    render(){
        let path = '/subjects/user/' + this.state.user_id;
        return (
            <div className="auth-page">
                <h2 className="auth-header">Login to use your Medi-Flash account to test your knowledge!</h2>
                <form onSubmit={this.handleFormSubmit}>
                    <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange} autoFocus />
                    <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                    <input className="submit" type="submit" value="LOGIN" />
                </form>
                <Link className="link" to="/register">Register</Link>
                <h4>{this.state.errorMessage}</h4>

                {this.state.fireRedirect
                    ? <Redirect push to={path} />
                      : ''}
            </div>
        )
    }
}

export default Login;
