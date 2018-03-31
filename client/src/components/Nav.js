import React, {Component} from 'react';
import cookies from 'cookies-js';
import axios from 'axios';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shown: '',
		};
	}

  logout = () => {
    cookies.set('user_id', 0);
    axios.get('/auth/logout')
    .catch(err => console.log('in error',err));
  }

	toggle = () => {
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
        <div onClick={this.toggle}>
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
			</div>
		)
	}
}

export default Nav;
