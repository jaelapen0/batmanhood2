import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "../components/searchbar/search_bar_container"

class Greeting extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            droppedOpen: false,
            buyingPower: 0
        }
        this.handleDropDown = this.handleDropDown.bind(this);
    }

    handleDropDown(){
        this.state.droppedOpen === false ?
        (this.setState({droppedOpen: true}),
        document.getElementById("accountid").className="myaccount2"

        ) :
        (this.setState({droppedOpen: false}),
        document.getElementById("accountid").className = "myaccount"
        
        );
    }

    componentDidMount(){
        debugger
        this.props.fetchBuyingPower(this.props.currentUser.id)
        .then(buyingPower=>{
            debugger;
            this.setState({ buyingPower: buyingPower.buying_power.buying_power})
        })
    }
    componentDidUpdate(prevProps, prevState){
        debugger;
        
    }

    render(){
        debugger;
        return(
            this.props.currentUser ? 
            
            (<div id="splashnav">
                    <div className="splash-with-search">
                        <a id="logo" href="/">Batmanhood</a>
                        <SearchBar />
                    </div>
                    <nav className="header-group1">
                        <a href="https://www.linkedin.com/in/jae-song-58771b82/" target="_blank">
                            <img className="linkedin-img" src="https://www.flaticon.com/svg/static/icons/svg/61/61109.svg" />
                        </a>
                        <a href="https://github.com/jaelapen0/batmanhood2" target="_blank">
                            <img className="github-img" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                        </a> 
                        <div id="accountid" className="myaccount" onClick={this.handleDropDown}
                         to="/">My Account
                         {this.state.droppedOpen === true ?
                            <div className="myaccountdropdown"> 
                                <h5>
                                    <span className="username">
                                            {`${this.props.currentUser.first_name} `}  {` ${this.props.currentUser.last_name}`}
                                        </span>
                                    <span className="username">
                                        
                                    </span>
                                    <br/>
                                    <br/>
                                    <span className="balance">
                                            Cash Balance:
                                            <br /> ${parseFloat(parseFloat(this.props.currentUser.buying_power).toFixed(2)).toLocaleString()}
                                    </span>
                                </h5>
                              
                                <br/>
                               <span> <Link id="logout" to="/" className="header-button1" onClick={this.props.logout}>Log Out</Link>
                                    </span>
                            </div>
                         : ""
                             
                             }
                         </div>

                        {/* <p>My Account</p> */}
                        {/* <a href="#/signup">My Account</a> */}


                        {/* <Link to="/" className="header-button" onClick={this.props.logout}>Log Out</Link> */}
                    </nav>
                </div>)

                :
                (<div id="splashnav" >
                    <a id="logo" href="/">Batmanhood</a>

                    <nav className="header-group">
                        {/* <a id="logo" href="/">Batmanhood</a> */}
                        <Link to="/login">Log In</Link>
                        <Link className="header-button" to="/signup">Sign Up</Link>
                    </nav>
                </div >)
            
        )
    }
}

// const Greeting = ({ currentUser, logout }) => {
//     const sessionLinks = () => (
//         <div id="splashnav">
//             <a id="logo" href="/">Batmanhood</a>
           
//             <nav className="header-group">
//             {/* <a id="logo" href="/">Batmanhood</a> */}
//                 <Link to="/login">Log In</Link>
//                 <Link className="header-button" to="/signup">Sign Up</Link>
//             </nav>
//         </div>
//     );
//     const personalGreeting = () => (
       

//         <div id="splashnav">
//             <div className="splash-with-search">
//                 <a id="logo" href="/">Batmanhood</a>
//                 <SearchBar/>
//             </div>
//             <nav className="header-group">
//                 <Link onMouseOver={
//                     (<div>
//                         hi
//                     </div>)
//                 } to="/">My Account</Link>
//                 {/* <p>My Account</p> */}
//                 {/* <a href="#/signup">My Account</a> */}
//                 <Link to="/" className="header-button" onClick={logout}>Log Out</Link>
//             </nav>
//         </div>
//     );
//     return currentUser ? personalGreeting() : sessionLinks();
// };


export default Greeting;
