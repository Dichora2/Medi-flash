import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav.js'
import cookies from 'cookies-js';

const Header = () => {
  let user_id = cookies.get('user_id');
  let pathHeader = '';
  if (user_id === '0')
    pathHeader = '/login';
  else
    pathHeader = '/subjects/user/' + user_id;
  return(
    <div className='header'>
      <div className='header-flexbox'>
        <Nav />
        <div>
          <h1 className='website-title-header'><Link to={pathHeader}>Medi-Flash</Link></h1>
        </div>
      </div>
    </div>
  )
}

export default Header;
