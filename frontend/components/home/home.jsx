import React from "react"
// import Portfolio from "../portfolio/portfolio_container"
// import Watchlist from "../watchlist/watch_list_container"
import { Link } from 'react-router-dom';
import NewsFeed from "./news_feed_container"
import Portfolio from "./portfolio_container"
class Home extends React.Component{
    constructor(props){
        super(props)
        this.addMoney = this.addMoney.bind(this);
    }    
    componentDidMount(){
        // debugger;
        this.props.fetchBuyingPower(this.props.currentUser.id)
        .then(buyingPower => {
            // debugger
            this.setState({ buyingPower: buyingPower.buying_power.buying_power})
        })
    }

    componentDidUpdate(){

    }

    addMoney(e){
        // debugger;
        let amount = parseFloat(e.currentTarget.id);
        let oldTotal = parseFloat(this.state.buyingPower);
        let newTotal = amount + oldTotal;
        debugger;

        this.props.setBuyingPower(this.props.currentUser.id, newTotal)
            .then(amount=> {
                debugger;
            })
    }

    render(){
        // ;
        // debugger;
        return(
            <div>
                {this.state? (
                <div className="home-container">
                    <Portfolio props={this.props} buyingPower={this.state.buyingPower}/> 
                    {/* YEAHHHHHH HOMMMEEE */}
                    {/* <input className="search-bar" type="text"/> */}
                    {/* <div>
                        <Link to="/stocks/fsly">FSLY</Link>
                        <Link to="/stocks/aapl">AAPL</Link>
                        <Link to="/stocks/bynd">BYND</Link>
                        <Link to="/stocks/fb">FB</Link>
                        <Link to="/stocks/googl">GOOGL</Link>
                    </div> */}
                    
                    {/* <Watchlist props={this.props}/> */}
                    
                </div>) : "" }
                <div className="add-money-container">
                    <h2>Add Money</h2>
                    <div className="amount">
                        <button id="100" onClick={this.addMoney} className="header-button">$100</button>
                        <button id="500" onClick={this.addMoney} className="header-button">$500</button>
                        <button id="1000" onClick={this.addMoney} className="header-button">$1000</button>
                        <button id="10000" onClick={this.addMoney} className="header-button">$10,000</button>
                        <button id="100000" onClick={this.addMoney} className="header-button">$100,000</button>
                    </div>
                </div>
                    {/* <NewsFeed/> */}
            </div>
        )
    }
}

export default Home;