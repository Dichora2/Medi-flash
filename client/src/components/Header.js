import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
import Logout from './Logout.js'
import Nav from './Nav.js'
import cookies from 'cookies-js';

class Header extends Component {

    handleClickNav(){
        console.log('dropdown nav bar https://www.npmjs.com/package/react-sliding-pane')
    }





    render(){
      let pathSubjects = '/subjects/user/' + cookies.get('user_id');
      return(
          <div className='header'>
              <div className='header-content clearfix'>
                  <div className='hamburger' onClick={() => this.handleClickNav()}>
                  <Nav />

                      {/* <div className="hamburger-nav-icon"></div>
                      <div className="hamburger-nav-icon"></div>
                      <div className="hamburger-nav-icon"></div> */}
                  </div>
                  <h1 className='website-title-header'><Link to={pathSubjects}>Medi-Flash</Link></h1>
              </div>
          </div>
      )
    }

}

export default Header;
