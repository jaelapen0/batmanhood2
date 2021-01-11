import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            stocks: {}
        };
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

                 const stocksDetails = {}
                 
                Object.keys(trimmed).forEach(name =>{
                    this.props.pullStockDetails(name)
                        .then(data =>{
                            
                            const quantity = orders[name]
                            const req = Object.keys(orders).length
                            const data1 = data.data.forEach(minInfo => {
                                if(minInfo.average != null) {
                                    if(!stocksDetails[minInfo.minute]){
                                        stocksDetails[minInfo.minute] = [];
                                        
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                    }
                                    else{
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                    }
                                }
                            })
                             this.setState({stockDetails: stocksDetails, 
                                            req: req,
                                            trimmed: trimmed
                                            })
            
                        })
                 })
            })
            .then(this.props.fetchOrderHistory()
                .then(orders => {
                    let stocks = {}
                    debugger
                    let allOrders = orders.orderHistory;
                    
                    for (let i = 0; i < allOrders.length; i++){
                        // debugger;
                        if (stocks[allOrders[i].ticker_symbol]){
                            if (allOrders[i].order_type === "buy" ){
                                stocks[allOrders[i].ticker_symbol] += allOrders[i].shares_quantity
                            }
                            else if (allOrders[i].order_type === "sell") {
                                stocks[allOrders[i].ticker_symbol] -= allOrders[i].shares_quantity
                            }
                        }else{
                            stocks[allOrders[i].ticker_symbol] = allOrders[i].shares_quantity
                        
                        }
                    }
                    debugger;
                    this.setState({ stocks })
                }

                ))
    }

    componentDidUpdate(prevProps, prevState){
        // debugger;
    }
    render(){
        // 
        const theLast = [];
        let dataMin = 10000000000
        let dataMax = 0
        let color = "#21ce99"
        let dif = 0;
        let last = 0;
        let first = 0;
        let trimmed = {}
        if (this.state.req && Object.values(this.state.stockDetails["09:30"]) && this.state.req === Object.values(this.state.stockDetails["09:30"]).length ){
            trimmed = this.state.trimmed;
            const stockDetails = this.state.stockDetails;
            

                const buyingPower = parseFloat(this.props.buyingPower);
                const req = this.state.req;
                Object.keys(this.state.stockDetails).forEach(min =>{
                    // ;
                    if (stockDetails[min].length === req) {
                        // ;
                        stockDetails[min].push(parseInt(buyingPower))
                        let added = stockDetails[min].reduce((sum, x) => sum + x)
                         if (added < dataMin ) {dataMin = added}
                        if (added > dataMax) { dataMax = added }
                        theLast.push({ time: min, average: added.toFixed(2)});
                    }
                })
            first = parseFloat(theLast[0].average)
            last = parseFloat(theLast[theLast.length - 1].average)
            if (first > last) {
                color = "red";
                dif = last - first
            } else { dif = first - last }
                // 
        }

        // debugger
        let stocks = this.state.stocks
        return (
            <div>
                {first !== null ? 
                    (<div className="port-list"> 
                         <div className="porheader">
                            <h2 className="portfolio-header">Investing</h2>
                            <h3 className="portfolio-header">${theLast[0] ? parseFloat(theLast[theLast.length-1].average).toLocaleString() : ""}</h3>
                            <h4 className="portfolio-header">{dif > 0 ? "+" : ""} {dif.toFixed(2)} {dif > 0 ? "+" : ""} ({theLast[0] ?  ((dif / theLast[0].average).toFixed(2)): ""}%) </h4>
                            <LineChart className="linechart" width={700} height={200} data={theLast[0]? theLast : []}>
                                <XAxis dataKey="time" hide={true}></XAxis>
                                    <YAxis dataKey="average" domain={[dataMin, dataMax]} axisLine={false} hide={true}/>
                                <Tooltip></Tooltip>
                                    <Line type="monotone" dataKey="average" stroke={color} dot={false} strokeWidth='2' animationDuration={1500} />
                            </LineChart>
                        </div>
                        
                        {/* <div className="stocklist-container">
                            <h1>Stocks</h1>
                            {Object.keys(trimmed).map(name => (
                                <div>
                                    <Link to={`/stocks/${name}`}>
                                        <div className="list-stock" key={name}>
                                            <h4>{name.toUpperCase()}</h4>
                                            <p>{trimmed[name]} shares</p>
                                        </div>
                                    </Link>
                                </div>
                                ))}
                        </div> */}
                        <div className="stocklist-container">
                            <h1>Stocks</h1>
                            
                            {Object.keys(stocks).map(stock => {
                                debugger;
                                return(
                                <div>
                                    <Link to={`/stocks/${stock}`}>
                                        <div className="list-stock" key={stock}>
                                            <h4>{stock.toUpperCase()}</h4>
                                            <p>{stocks[stock]} shares</p>
                                        </div>
                                    </Link>
                                </div>)
                                }   
                            )}
                        </div>
                    </div>) : "GOTHAM" }
            </div>
        )
    }
}

export default Portfolio;