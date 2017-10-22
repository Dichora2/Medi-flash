import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleFormSubmit(e){
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
            console.log('user = ', res.data.user);
            console.log('user id = ', res.data.user.id);
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
        console.log('params = ',this.state.user_id)
        console.log('path = ',path);
        return (
            <div className="auth-page">

                <h1 className="auth-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>
                <h4>{this.state.errorMessage}</h4>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                    <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                    <input className="submit" type="submit" value="LOGIN" />
                </form>
                <a className="link" href="/register">Register</a>

                {this.state.fireRedirect
                    ? <Redirect push to={path} />
                      : ''}
            </div>
        )
    }
}

export default Login;
