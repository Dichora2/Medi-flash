import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
import cookies from 'cookies-js';


// var

class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			shown: '',
      'user_id': cookies.get('user_id')
		};
	}

  logout() {
    cookies.set('user_id', 0);
  }

	toggle() {
		this.setState({
			shown: !this.state.shown
		});
	}

	render() {
		var shown = {
			display: this.state.shown ? "block" : "none"
		};

		var hidden = {
			display: this.state.shown ? "none" : "block"
		}

    let path = `/subjects/user/${cookies.get('user_id')}`;

		return (
			<div>
            <div onClick={this.toggle.bind(this)}>
                <div className='nav'>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>
                </div>

            </div>

				<div className='nav-icon' style={ shown }>
                    <div className='nav-list'>
                        <a href={(cookies.get('user_id') !== '0') ? path : '/'} className='nav-link'>Subjects</a>
                        <a href='/logout' onClick={this.logout} className='nav-link'>Signout</a>


                    </div>

                </div>
				<h2 style={ hidden }></h2>
			</div>
		)
	}
}

export default Nav;
