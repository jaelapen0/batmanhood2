import React from "react"
import Portfolio from "../portfolio/portfolio_container"
import Watchlist from "../watchlist/watch_list_container"
import { Link } from 'react-router-dom';
import NewsFeed from "./news_feed_container"
class Home extends React.Component{
    constructor(props){
        super(props)
    }    
   
    render(){
        // debugger;
        return(
            <div>
                <div className="home-container">
                    <Portfolio props={this.props}/> 
                    {/* YEAHHHHHH HOMMMEEE */}
                    {/* <input className="search-bar" type="text"/> */}
                    <Watchlist props={this.props}/>
                    <Link to="/stocks/fsly">stock</Link>
                </div>
                <NewsFeed/>
            </div>
        )
    }
}

export default Home;