import React from "react"
// import Portfolio from "../portfolio/portfolio_container"
// import Watchlist from "../watchlist/watch_list_container"
import { Link } from 'react-router-dom';
import NewsFeed from "./news_feed_container"
import Portfolio from "./portfolio_container"
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            stocks: {},
            stocksDetails: [],
            req: 0,
            theLast: [],
            dataMin: 10000000000,
            dataMax: 0,
            color: "#21ce99",
            dif: 0,
            last: 0,
            first: 0,
            trimmed: {},
            buyingPower: 0,
        }
        this.addMoney = this.addMoney.bind(this);
        
    }    
    componentDidMount(){
      
        this.props.fetchBuyingPower(this.props.currentUser.id)
        .then(buyingPower => {
      
            this.setState({ buyingPower: buyingPower.buying_power.buying_power})
        })
               
    }

    componentDidUpdate(){

    }

    addMoney(e){
        // ;
        let amount = parseFloat(e.currentTarget.id);
        let oldTotal = parseFloat(this.state.buyingPower);
        let newTotal = amount + oldTotal;
        let id = this.props.currentUser.id;
    

        this.props.setBuyingPower(this.props.currentUser.id, newTotal)
        .then(this.props.fetchBuyingPower(id)
            .then(buyingPower => {
                ;
                this.setState({ buyingPower: buyingPower.buying_power.buying_power })
            }))
    }

    render(){
        // ;
        // ;
        const { stocksDetails,
            req,
            theLast,
            dataMin,
            dataMax,
            color,
            dif,
            last,
            first
        } = this.state;

        return(
            <div>
                {this.state? (
                <div className="home-container">
                    {this.state.buyingPower ?
                    <Portfolio props={this.props} buyingPower={this.state.buyingPower} 
                    stocks={this.state.stocks} 
                    
                    stocksDetails= {stocksDetails}
                    req = {req}
                    theLast = {theLast}
                    dataMin = {dataMin}
                    dataMax = {dataMax}
                    color = {color}
                    dif = {dif}
                    last = {last}
                    first = {first}
                    /> 
                    : ""}
                    
                    {/* <Watchlist props={this.props}/> */}
                    
                </div>) : "" }
                <div className="add-money-container">
                    <h3>Add Money</h3>
                    <h5>Cash Balance: ${parseFloat(parseFloat(this.state.buyingPower).toFixed(2)).toLocaleString()}</h5>
                    <div className="amount">
                        <button id="100" onClick={this.addMoney} className="header-button">$100</button>
                        <button id="500" onClick={this.addMoney} className="header-button">$500</button>
                        <button id="1000" onClick={this.addMoney} className="header-button">$1000</button>
                        <button id="10000" onClick={this.addMoney} className="header-button">$10,000</button>
                        <button id="100000" onClick={this.addMoney} className="header-button">$100,000</button>
                    </div>
                </div>
                    <NewsFeed/>
            </div>
        )
    }
}

export default Home;