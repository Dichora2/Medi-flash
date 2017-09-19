import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Login extends Component {

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleInputChange(e) {
        const username = e.target.username;
        const password = e.target.password;
        this.setState({
          [username]: password,
       });
    }

    handleFormSubmit(e){
        e.preventDefault();   
        axios.post('/', {
            username: this.state.username,
            password: this.state.password
        })
    }

    render(){
        return (
            <div> 
                <h1 className="login-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                    <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                    <input type="submit" value="Log in" />
                </form>
                
                <a class="registerLogin" href="/auth/register">Register</a>
            </div>
        )
    }
}