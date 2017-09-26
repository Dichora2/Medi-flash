import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';
import Logout from './Logout.js'
import Nav from './Nav.js'

class Header extends Component {

    handleClickNav(){
        console.log('dropdown nav bar https://www.npmjs.com/package/react-sliding-pane')
    }
    render(){
        return(
            <div className='header'>
                <script src="https://use.fontawesome.com/23dcf0aa4b.js"></script>
                <div className='header-content clearfix'>
                    <div className='hamburger' onClick={() => this.handleClickNav()}>
                    </div>
                    <h1 className='website-title-header'><Link to='/'>Medi-flash</Link></h1>
                </div>
            </div>
        )
    }

}

export default Header;
