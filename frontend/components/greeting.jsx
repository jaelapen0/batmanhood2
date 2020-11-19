import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        <nav className="header-group">
            <Link to="/login">Login</Link>
            <Link className="header-button" to="/signup">Sign up</Link>
        </nav>
    );
    const personalGreeting = () => (
        <nav className="header-group">
            {/* <h2 className="header-name"> My Account</h2> */}
            <a href="">My Account</a>
            <button className="header-button" onClick={logout}>Log Out</button>
        </nav>
    );
    
    return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
