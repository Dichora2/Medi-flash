import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



<div class="auth">
  <h1>member</h1>

  <form method="POST" action="/auth/register">
    <input name="username" type="text" placeholder="username" required />
    <input name="email" type="email" placeholder="email" required />
    <input name="password" type="password" placeholder="password" required />
    <input type="submit" value="Register"/>
  </form>
</div>

  <a class="registerLogin" href="/auth/login">Login</a>


class Register extends Component {
    
        constructor(props){
            super(props);
            this.state ={
                firstname: '',
                lastname: '',
                email: '',
                username: ''
            };
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
        }
    
        handleInputChange(e) {
            const firstname = e.target.firstname;
            const lastname = e.target.lastname;
            const email = e.target.email;
            const username = e.target.username;            
            const password = e.target.password;
            this.setState({
                firstname: firstname, 
                lastname: lastname, 
                email: email, 
                username:username, 
                password: password
            });
        }
    
        handleFormSubmit(e){
            e.preventDefault();   
            axios.post('/', {
                firstname: this.state.firstname, 
                lastname: this.state.lastname, 
                email: this.state.email, 
                username: this.state.username, 
                password: this.state.password
            })
        }
    
        render(){
            return (
                <div> 
                    <h1 className="login-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <input name="firstname" type="text" placeholder="firstname" required onChange={this.handleInputChange}/>
                        <input name="lastname" type="text" placeholder="lastname" required onChange={this.handleInputChange}/>
                        <input name="email" type="text" placeholder="email" required onChange={this.handleInputChange}/>
                        <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                        <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                        <input type="submit" value="Sign up" />
                    </form>
                    <a class="Signin" href="/">Sign up</a>
                </div>
            )
        }
    }


    export default Register;