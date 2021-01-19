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
        // 
        if (this.props.currentUser){
        this.props.fetchBuyingPower(this.props.currentUser.id)
        .then(buyingPower=>{
            // ;
            this.setState({ buyingPower: buyingPower.buying_power.buying_power})
        })
        }
    }
    componentDidUpdate(prevProps, prevState){
        // ;
        
    }

    render(){
        // ;
        return(
            this.props.currentUser ? 
            
            (<div id="splashnav">
                    <div className="splash-with-search">
                        <a id="logo" href="/">Batmanhood</a>
                        <SearchBar />
                    </div>
                    <nav className="header-group1">

                        <a href="http://jae-song.com" target="_blank">
                            <img className="github-img3" src="data:image/png;base64,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" />
                        </a>

                        <a href="https://www.linkedin.com/in/jae-song-58771b82/" target="_blank">
                            <img className="linkedin-img" src="https://www.flaticon.com/svg/static/icons/svg/61/61109.svg" />
                        </a>
                        <a href="https://github.com/jaelapen0/batmanhood2" target="_blank">
                            <img className="github-img" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" />
                        </a> 

                        <a href="https://angel.co/u/jae-song-6" target="_blank">
                            <img className="github-img2" src="data:image/png;base64,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" alt=""
                     />
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
