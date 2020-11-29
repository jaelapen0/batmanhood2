import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "../components/searchbar/search_bar_container"


const Greeting = ({ currentUser, logout }) => {
    const sessionLinks = () => (
        <div id="splashnav">
            <a id="logo" href="/">Batmanhood</a>
           
            <nav className="header-group">
            {/* <a id="logo" href="/">Batmanhood</a> */}
                <Link to="/login">Log In</Link>
                <Link className="header-button" to="/signup">Sign Up</Link>
            </nav>
        </div>
    );
    const personalGreeting = () => (
        <div id="splashnav">
            <div className="splash-with-search">
                <a id="logo" href="/">Batmanhood</a>
                <SearchBar/>
            </div>
            <nav className="header-group">
                <Link to="/">My Account</Link>
                {/* <a href="#/signup">My Account</a> */}
                <Link to="/" className="header-button" onClick={logout}>Log Out</Link>
            </nav>
        </div>
    );
    return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;
