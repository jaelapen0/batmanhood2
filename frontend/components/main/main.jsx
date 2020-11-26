import React from "react"
import SplashMain from "../splash/splash_main";
import Home from "../home/home_container"
class Main extends React.Component{

    constructor(props)
    {
        super(props)
        // 
    }

    render(){
        // 
        return this.props.currentUser ? <Home props={this.props}/> : <SplashMain props={this.props}/>
    }

}


export default Main;

// const Greeting = ({ currentUser, logout }) => {
//     const sessionLinks = () => (
//         <nav className="header-group">
//             <Link to="/login">Login</Link>
//             <Link className="header-button" to="/signup">Sign up</Link>
//         </nav>
//     );
//     const personalGreeting = () => (
//         <nav className="header-group">
//             {/* <h2 className="header-name"> My Account</h2> */}
//             <a href="#/signup">My Account</a>
//             <button className="header-button" onClick={logout}>Log Out</button>
//         </nav>
//     );
//     return currentUser ? personalGreeting() : sessionLinks();
// };