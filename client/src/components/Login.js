import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {

    constructor(props){
        super(props);
        this.state ={
            user_id: 0,
            username: '',
            password: '',
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
            this.setState({
                user_id: res.data.user.id,
                fireRedirect: true,
            });
          }
        })
        .catch(err => console.log('in error',err));
      e.target.reset();
    }


    render(){
        let path = '/subjects/user/' + this.state.user_id;
        console.log('params = ',this.state.user_id)
        console.log('path = ',path);
        return (
            <div className="auth-page">

                <h1 className="auth-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>

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
