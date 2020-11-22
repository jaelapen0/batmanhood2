import React from "react"
import Portfolio from "../portfolio/portfolio_container"
import Watchlist from "../watchlist/watch_list_container"
import { Link } from 'react-router-dom';

class Home extends React.Component{
    constructor(props){
        super(props)
    }    
   
    render(){
        // debugger;
        return(
            <div className="home-container">
                <Portfolio props={this.props}/> 
                {/* YEAHHHHHH HOMMMEEE */}
                {/* <input className="search-bar" type="text"/> */}
                <Watchlist props={this.props}/>
                <Link to="/stocks/fsly">stock</Link>
            </div>
        )
    }
}

export default Home;