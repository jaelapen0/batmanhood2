import React from "react"
import Portfolio from "../portfolio/portfolio_container"
import Watchlist from "../watchlist/watch_list_container"


class Home extends React.Component{
    constructor(props){
        super(props)
    }    

    render(){
        return(
            <div className="home-container">
                <Portfolio props={this.props}/> 
                {/* YEAHHHHHH HOMMMEEE */}
                {/* <input className="search-bar" type="text"/> */}
                <Watchlist props={this.props}/>
            </div>
        )
    }
}

export default Home;