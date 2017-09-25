import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

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
              console.log('in register',res.data);
              this.setState({
                user_id: res.data.user.id,
                fireRedirect: true,
              });
            })
            .catch(err => console.log('in error',err));
          e.target.reset();
         }

        render(){
            let path = '/subjects/user/' + this.state.user_id;

            return (

                <div className="auth-page">
                    <h1 className="auth-header">Use your Medi-flash account to add, save, and test your knowledge.</h1>
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <input name="firstname" type="text" placeholder="firstname" required onChange={this.handleInputChange}/>
                        <input name="lastname" type="text" placeholder="lastname" required onChange={this.handleInputChange}/>
                        <input name="email" type="text" placeholder="email" required onChange={this.handleInputChange}/>
                        <input name="username" type="text" placeholder="username" required onChange={this.handleInputChange}/>
                        <input name="password" type="password" placeholder="password" required onChange={this.handleInputChange}/>
                        <input className='submit' type="submit" value="SIGN UP" />


                    </form>
                    <a className="link" href="/">Login</a>


                    {this.state.fireRedirect
                        ? <Redirect push to={path} />
                        : ''}
                </div>
            )
        }
    }


    export default Register;
