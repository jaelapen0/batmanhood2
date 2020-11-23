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
                    <div>
                        <Link to="/stocks/fsly">FSLY</Link>
                        <Link to="/stocks/aapl">AAPL</Link>
                        <Link to="/stocks/bynd">BYND</Link>
                        <Link to="/stocks/fb">FB</Link>
                        <Link to="/stocks/googl">GOOGL</Link>
                    </div>
                    
                    <Watchlist props={this.props}/>
                    
                </div>
                <NewsFeed/>
            </div>
        )
    }
}

export default Home;