import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.js'
import cookies from 'cookies-js';

const Header = () => {
  let user_id = cookies.get('user_id');
  let pathSubjects = '';
  if (user_id === '0')
    pathSubjects = '/login';
  else
    pathSubjects = '/subjects/user/' + user_id;
  return(
    <div className='header'>
      <div className='header-content clearfix'>
        <div className='hamburger'>
          <Nav />
        </div>
        <h1 className='website-title-header'><Link to={pathSubjects}>Medi-Flash</Link></h1>
      </div>
    </div>
  )
}

export default Header;
