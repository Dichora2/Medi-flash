import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import cookies from 'cookies-js';
import axios from 'axios';

class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shown: false,
		};
	}

  logout = () => {
		this.toggle();
    cookies.set('user_id', 0);
    axios.get('/auth/logout')
    .catch(err => console.log('in error',err));
  }

	toggle = () => {
		if (cookies.get('user_id') !== '0') {
			this.setState({
				shown: !this.state.shown
			});
		}
	}

	render() {
		let shown = {
			display: this.state.shown ? "block" : "none"
		};

		let user_id = cookies.get('user_id');
		let path = '';
		if (user_id === '0') {
			path = '/';
		}
		else {
    	path = `/subjects/user/${user_id}`;
		}

		return (
			<div>
        <div className='nav-icon' onClick={this.toggle}>
          <div className="hamburger-nav-icon"></div>
          <div className="hamburger-nav-icon"></div>
          <div className="hamburger-nav-icon"></div>
        </div>
        <div className='nav-menu' style={ shown }>
					<nav>
	          <Link to={path} onClick={this.toggle} className='nav-link'>Subjects</Link>
	          <Link to='/logout' onClick={this.logout} className='nav-link'>Logout</Link>
					</nav>
        </div>
			</div>
		)
	}
}

export default Nav;
