import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
import Logout from './Logout.js'



class Nav extends React.Component {
	constructor() {
		super();
		this.state = {
			shown: '',
		};
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
                        <a className='nav-link'>Subjects</a>
                        <a className='nav-link'>Search Flashcards</a>
                        <a className='nav-link'>Signout</a>
                    </div>
                </div>
				<h2 style={ hidden }></h2>
			</div>
		)
	}
}

export default Nav;
