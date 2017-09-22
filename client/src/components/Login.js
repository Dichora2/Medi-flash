import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: '',
            fireRedirect: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        console.log(this.state)
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleFormSubmit(e){
        e.preventDefault();
        console.log(this.state)
        axios('/auth/login', {
            method: 'POST',
            data: {
                username: this.state.username,
                password: this.state.password,
            },
        })
        .then(res => {
            console.log('in login',res);
            this.setState({
                fireRedirect: true,
            });
        })
        .catch(err => console.log('in error',err));
      e.target.reset();
    }


    render(){
        return (
            <div>
                <a class="Register" href="/">Register</a>

                <h1 className="login-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                    <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                    <input type="submit" value="Log in" />
                </form>
                {this.state.fireRedirect
                    ? <Redirect push to={`/home`} />
                      : ''}
            </div>
        )
    }
}

export default Login;
