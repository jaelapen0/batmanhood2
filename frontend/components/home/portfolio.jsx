import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { getOrderHistory } from "../../util/account_util";
import stockShowUtil from "../../util/stock_show_util";


class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
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

                const trimmed ={};
                for (name in orders) { 
                    if (orders[name] > 0){
                        trimmed[name] = orders[name]
                    }
                 }
                //  debugger
                 const stocksDetails = {}
                 
                // Object.keys(trimmed).forEach(name =>{
                    // this.props.pullStockDetails("AAPL")
                    this.props.pullStockDetails("AAPL")
                        .then(data =>{
                          
                            
                            // const quantity = orders[name]
                            const quantity = orders["AAPL"]
                            // const req = Object.keys(orders).length
                            const req = 1
                            
                            const data1 = data.data.forEach(minInfo => {
                                if(minInfo.average != null) {
                                    if(!stocksDetails[minInfo.minute]){
                                        stocksDetails[minInfo.minute] = [];
                                        // debugger;
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                        // debugger
                                    }
                                    else{
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                    }
                                }
                            })
                             this.setState({stockDetails: stocksDetails, req: req})
                        //    debugger;

                        })
                //  })
                //  debugger;
            
            }
            
        )
    }
    render(){
        // debugger
        const theLast = [];
        let dataMin = 10000000000
        let dataMax = 0
        let color = "#21ce99"
        let dif = 0;
        let last = 0;
        let first = 0;
        if (this.state.req && Object.values(this.state.stockDetails["09:30"]) && this.state.req === Object.values(this.state.stockDetails["09:30"]).length ){
        // if (stockDetails[0].length === Object.keys(orders).length && stockDetails[1].length === Object.keys(orders).length) {
            // const {stockDetails, req} = this.state
            // let req = Object.keys(orders).length
            // debugger;
            // for (key in this.state.stockDetails) {
                // this.
                const stockDetails = this.state.stockDetails
                // debugger;
                if (stockDetails["12:59"]) {
                    // last = stockDetails["12:59"].reduce((sum, x) => sum + x)
                   for(let i = 0; i< stockDetails["12:59"].length; i++){
                       last += stockDetails["12:59"][i]
                   }
                }
                // if (stockDetails["01:59"]) { last = stockDetails["01:59"].reduce((sum, x) => sum + x) }
                // if (stockDetails["02:59"]) { last = stockDetails["02:59"].reduce((sum, x) => sum + x) }
                if (stockDetails["03:59"]) {
                    //  last = stockDetails["03:59"].reduce((sum, x) => sum + x) 
                    for (let i = 0; i < stockDetails["03:59"].length; i++) {
                        last += stockDetails["03:59"][i]
                    }
                    }
                let first = 0;  
                for (let i = 0; i < stockDetails["09:30"].length; i++) {
                    first += stockDetails["09:30"][i]}

                // first = stockDetails["09:30"].reduce((sum, x) => sum + x)
                if(first > last) {
                    color = "red";
                    dif = last - first
                } else { dif = first- last }
                const buyingPower = parseFloat(this.props.buyingPower);
                const req = this.state.req;
                Object.keys(this.state.stockDetails).forEach(min =>{
                    // debugger;
                    if (stockDetails[min].length === req) {
                        // debugger;
                        stockDetails[min].push(parseInt(buyingPower))
                        let added = 0 
                        for (let i = 0; i < stockDetails[min].length; i++) {
                            added += stockDetails[min][i]}
                        //  stockDetails[min].reduce((sum, x) => sum + x)
                         if (added < dataMin ) {dataMin = added}
                        if (added > dataMax) { dataMax = added }
                        theLast.push({ time: min, average: added.toFixed(2)});
                        // debugger;
                    }
                })
            // debugger
        }
        // debugger
        return (
            <div>
                {this.state.stockDetails?
                // dataMax !== 0 ? 
                (
                    <div>
                            <h1 className="portfolio-header">${last.toFixed(2)}</h1>
                            {/* <h5>{dif > 0 ? "+" : ""} {dif.toFixed(2)} {dif > 0 ? "+" : ""} ({dif / this.state.stockDetails["9:30"]}) </h5> */}
                        <LineChart className="linechart" width={670} height={300} data={theLast}>
                            <XAxis dataKey="time" hide={true}></XAxis>
                            {/* <YAxis tick={<CustomizedTickY locale={locale} />} domain={['dataMin', 'dataMax']} /> */}
                                <YAxis dataKey="average" domain={[dataMin, dataMax]} axisLine={false} hide={true}/>
                            <Tooltip></Tooltip>
                                <Line type="monotone" dataKey="average" stroke={color} dot={false} strokeWidth='3' animationDuration={1500} />
                        </LineChart>
                         {/* {this.state.portfolio.portfolio.map()} */}
                    </div>
                )
                    : "no bueno" }
                    
              
            </div>
        )
        
    }
}

export default Portfolio;