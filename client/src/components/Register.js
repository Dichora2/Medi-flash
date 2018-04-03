import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import cookies from 'cookies-js';

class Register extends Component {

    constructor(props){
        super(props);
        this.state ={
            user_id: '',
            firstname: '',
            lastname: '',
            email: '',
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
        axios('/auth/register', {
            method: 'POST',
            data: {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            }
        })
        .then(res => {
          cookies.set('user_id', res.data.user.id);
          this.setState({
            user_id: res.data.user.id,
            fireRedirect: true,
            errorMessage: ''
          });
        })
        .catch(err => {
          console.log('in error',err)
          this.setState({
            errorMessage: 'User name already exists. Please try a different name.'
          })
        });
      e.target.reset();
    }

    render(){
        let path = '/subjects/user/' + this.state.user_id;
        return (
            <div className="auth-page">
                <h1 className="auth-header">Use your Medi-Flash account to test your knowledge!</h1>
                <h4>{this.state.errorMessage}</h4>
                <form onSubmit={this.handleFormSubmit}>
                    <input name="firstname" type="text" placeholder="firstname" required onChange={this.handleInputChange}/>
                    <input name="lastname" type="text" placeholder="lastname" required onChange={this.handleInputChange}/>
                    <input name="email" type="text" placeholder="email" required onChange={this.handleInputChange}/>
                    <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                    <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                    <input className='submit' type="submit" value="SIGN UP" />
                </form>
                <Link className="link" to="/login">Login</Link>
                {this.state.fireRedirect
                    ? <Redirect push to={path} />
                    : ''}
            </div>
        )
    }
}


export default Register;
