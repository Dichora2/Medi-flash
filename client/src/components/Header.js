import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import App from '../App';
import Flexbox from 'flexbox-react';


class Header extends Component {

    handleClickNav(){
        console.log('dropdown nav bar https://www.npmjs.com/package/react-sliding-pane')
    }

    render(){
        return(
            <div className='header'>
                <div className='header-content clearfix'>
                    <div className='hamburger' onClick={() => this.handleClickNav()}>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>
                        <div className="hamburger-nav-icon"></div>

                    </div>
                    <h1 className='website-title-header'><Link to='/'>Medi-flash</Link></h1>
                    <h4 className='user-name-header'>username</h4>
                </div>
            </div>
        )
    }

}

export default Header;