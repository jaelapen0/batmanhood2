import React from 'react';
import { Link } from 'react-router-dom';



const Greeting = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        
        <nav className="header-group">
            <Link to="/login">Log In</Link>
            <Link className="header-button" to="/signup">Sign Up</Link>
        </nav>
    );
    const personalGreeting = () => (
        <nav className="header-group">
            <Link to="/">My Account</Link>
            {/* <a href="#/signup">My Account</a> */}
            <Link to="/" className="header-button" onClick={logout}>Log Out</Link>
        </nav>
    );
    return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
