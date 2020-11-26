import React from "react"
import { getOrderHistory } from "../../util/account_util";


class Portfolio extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.fetchPortfolio()
            .then(portfolio => {
                const orders = {}
                portfolio.portfolio[0].forEach(order =>{

                    if (!orders[order.ticker_symbol])
                        if (order.order_type === "buy"){
                            orders[order.ticker_symbol] = parseInt(order.shares_quantity)}
                        else if ( order.order_type === "sell"){
                            orders[order.ticker_symbol] = -parseInt(order.shares_quantity)}
                    else{
                            if (order.order_type === "buy") {
                                orders[order.ticker_symbol] += parseInt(order.shares_quantity)
                            }
                            else if (order.order_type === "sell") {
                                orders[order.ticker_symbol] -= -parseInt(order.shares_quantity)
                            }
                    }
                })
                let final =[];
                debugger;
                for (key in orders) { 
                    if (orders[key] > 0){
                        debugger;
                        
                    }
                 }
                debugger;
                // console.log(orders)
                this.setState({portfolio})
            })
            debugger;
        
    }
    render(){
        debugger;
        // if (this.state){
        //     debugger
        //     const { portfolio } = this.state.portfolio
        //     return(
        //         {
        //             <div>
                    
        //             </div>
        //         }
        // )}

        return (
            <div>
                {this.state ? 
                (
                    <div>
                        working!!    {/* {this.state.portfolio.portfolio.map()} */}
                    </div>
                )
                    : "no bueno" }
                MY PORTFOLIO
            </div>
        )
        
    }
}

export default Portfolio;