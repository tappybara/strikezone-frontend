import React from 'react'
import '../css/main.css'

import {NavLink} from 'react-router-dom';

//download create browswer history

export default class NavBar extends React.Component{
    render() {
        return (
            <div>
                <ul className="navBar">
                    <li className="navBarItemLeft"><NavLink to="/" className="navBarLink" style={{ textDecoration: 'none', color: 'white' }}>Home</NavLink></li>
                    <li className="navBarTitle">StrikeZone</li>
                    <li className="navBarItemRight">Home</li>
                </ul>
            </div>
        );
    }
}