import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';



class Logout extends Component {




    constructor(props){
        super(props);
        this.state ={
            // username: this.state.username,
            fireRedirect: false
        };
        this.changeToLogout = this.changeToLogout.bind(this);
    }

    
    changeToLogout(e){
        e.preventDefault();
        axios('/logout', {
            method: 'POST',
            data: {
                // username: this.state.username,
                fireRedirect: false                
            },
        })
        .then(res => {
          if (res.data.auth) {
            this.setState({
                // fireRedirect: true,
            });
          }
        })
        .catch(err => console.log('in error',err));
      e.target.reset();
    }


    render(){
        return (
            <div>
                <button onSubmit={(e) => this.changeToLogout(e)}>Logout</button>
                
{/*             
            {this.state.fireRedirect
            ? <Redirect push to={`/`} />
                : ''} */}
            </div>
        )
    }
}

export default Logout;
