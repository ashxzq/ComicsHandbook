import React from 'react';
import './navbar.scss';
import logo from '../assets/logo.png';
import {Link} from 'react-router-dom';

function Navbar() {
    return (
        <div className="navbar" id="navbar">
            <div className= "navContent">
                <div className="logo">
                    <img id="marvellogo" src={logo} alt="Logo"></img>
                    <a id="headerlogo">Marvel Comics Directory</a>
                </div>
                <ul className="navButtons" id="buttons">
                        <li>
                            <Link to='/'>
                                Search
                            </Link></li>
                        <li>
                            <Link to='/gallery'>
                                Gallery
                            </Link>
                        </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;