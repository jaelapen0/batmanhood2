import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

class Portfolio extends React.Component {
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
            trimmed: {}
        };
    }
    
    componentDidMount(){

        const stocksDetails = {};
        const stocks = {}
        const {
            buyingPower } = this.props;
            
        this.props.fetchOrderHistory()
            .then(orders => {

                let allOrders = orders.orderHistory;

                for (let i = 0; i < allOrders.length; i++) {
                    // ;
                    if (stocks[allOrders[i].ticker_symbol]) {
                        if (allOrders[i].order_type === "buy") {
                            stocks[allOrders[i].ticker_symbol].amountt += allOrders[i].shares_quantity
                        }
                        else if (allOrders[i].order_type === "sell") {
                            stocks[allOrders[i].ticker_symbol].amountt -= allOrders[i].shares_quantity
                        }
                    } else {
                        stocks[allOrders[i].ticker_symbol] = {}
                        stocks[allOrders[i].ticker_symbol].amountt = allOrders[i].shares_quantity

                    }
                }
                // debugger;
            }
        )
        .then(() => {
        Object.keys(stocks).forEach(name => {
            // debugger;
            if (stocks[name].amountt > 0){

                    this.props.pullStockDetails(name)
                        .then(data => {
                            const quantity = stocks[name].amountt
                            const req = Object.keys(stocks).length
                            let reqMet = 0;
                            stocks[name].firstPrice = 0;
                            stocks[name].lastPrice = 0;
                            stocks[name].stockDif = 0;
                            const data1 = data.data.forEach(minInfo => {
                                // debugger;
                                if (minInfo.average != null) {
                                    if (!stocksDetails[minInfo.minute]) {
                                        stocksDetails[minInfo.minute] = [];

                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                    }
                                    else {
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.minute].push(totalAmount);
                                    }
                                    
                                    if (stocks[name].firstPrice === 0) stocks[name].firstPrice = minInfo.average;
                                    // debugger;
                                    if (minInfo.average != 0) {
                                        stocks[name].lastPrice = minInfo.average;
                                        stocks[name].stockDif = stocks[name].lastPrice - stocks[name].firstPrice;
                                    }
                                    // debugger;
                                }
                                if (stocksDetails[minInfo.minute] && stocksDetails[minInfo.minute].length > 0) {
                                    reqMet += 1
                                };
                            })
                            // debugger
                            if (reqMet / Object.keys(stocksDetails).length > .4) {
                                const theLast = [];
                                let dataMin = 10000000000
                                let dataMax = 0
                                let color = "#21ce99"
                                let dif = 0;
                                let last = 0;
                                let first = 0;
                                let trimmed = {}
                                
                                Object.keys(stocksDetails).forEach(min => {
                                    // 
                                    if (stocksDetails[min].length === req) {
                                        
                                        stocksDetails[min].push(parseInt(buyingPower))
                                        let added = stocksDetails[min].reduce((sum, x) => sum + x)
                                        if (added < dataMin) { dataMin = added }
                                        if (added > dataMax) { dataMax = added }
                                        theLast.push({ time: min, average: added.toFixed(2) });
                                    }
                                })

                                if (theLast.length > 0) {
                                    first += parseFloat(theLast[0].average)
                                    last += parseFloat(theLast[theLast.length - 1].average)
                                    if (first > last) {
                                        color = "red";
                                        dif = last - first
                                    } else { dif = first - last }
                                    // debugger;
                                    this.setState({
                                        stocksDetails: stocksDetails,
                                        req: req,
                                        theLast,
                                        dataMin,
                                        dataMax,
                                        color,
                                        dif,
                                        last,
                                        first,
                                        stocks,
                                        // [name]: {firstPrice, lastPrice}
                                    
                                    }, this.render)
                                    
                                }
                            }
                                else {
                                    // debugger;
                                    this.setState({
                                        stocksDetails: stocksDetails,
                                        req: req,
                                    })
                                }

                        })
            
            }
            else{delete stocks[name]}
        })
        })
    }
    componentDidUpdate(prevProps, prevState){
        

        if (prevProps.buyingPower != this.props.buyingPower){
            let newBuyingPower = this.props.buyingPower;
            let theLast = this.state.theLast;
            let difference = parseFloat(this.props.buyingPower) - parseFloat(prevProps.buyingPower)
            let dataMin = 10000000000
            let dataMax = 0
            for ( let i = 0; i < theLast.length; i++){
               theLast[i].average =  (parseFloat(theLast[i].average) + difference).toFixed(2)
                if (parseFloat(theLast[i].average) < dataMin) { dataMin = parseFloat(theLast[i].average) }
                if (parseFloat(theLast[i].average) > dataMax) { dataMax = parseFloat(theLast[i].average) }
            }
            this.setState({theLast, dataMin, dataMax})
        }

        // if (this.props.stocks && Object.keys(this.props.stocks).length > 0 && prevProps.stocks != this.props.stocks){
            // const stocksDetails = {};
            // const { stocks, buyingPower} = this.props;
            // Object.keys(stocks).forEach(name => {
            //     this.props.pullStockDetails(name)
            //         .then(data => {
            //             // ;
            //             const quantity = stocks[name]
            //             const req = Object.keys(stocks).length
            //             // ;
            //             let reqMet = 0;
            //             const data1 = data.data.forEach(minInfo => {
            //                 if (minInfo.average != null) {
            //                     if (!stocksDetails[minInfo.minute]) {
            //                         stocksDetails[minInfo.minute] = [];

            //                         let totalAmount = minInfo.average * quantity
            //                         stocksDetails[minInfo.minute].push(totalAmount);
            //                     }
            //                     else {
            //                         let totalAmount = minInfo.average * quantity
            //                         stocksDetails[minInfo.minute].push(totalAmount);
            //                     }
            //                 }
            //                 if (stocksDetails[minInfo.minute] && stocksDetails[minInfo.minute].length > 0) {
            //                     // ;
            //                     reqMet += 1};
            //             })
            //             // ;

            //             if (reqMet / Object.keys(stocksDetails).length > .4){
            //                 const theLast = [];
            //                 let dataMin = 10000000000
            //                 let dataMax = 0
            //                 let color = "#21ce99"
            //                 let dif = 0;
            //                 let last = 0;
            //                 let first = 0;
            //                 let trimmed = {}

            //                 Object.keys(stocksDetails).forEach(min => {
            //                     // ;
            //                     if (stocksDetails[min].length === req) {
            //                         // ;
            //                         stocksDetails[min].push(parseInt(buyingPower))
            //                         let added = stocksDetails[min].reduce((sum, x) => sum + x)
            //                         if (added < dataMin) { dataMin = added }
            //                         if (added > dataMax) { dataMax = added }
            //                         theLast.push({ time: min, average: added.toFixed(2) });
            //                     }
            //                 })
                            
            //                 if (theLast.length > 0){
            //                     first += parseFloat(theLast[0].average)
                                
            //                     last += parseFloat(theLast[theLast.length - 1].average)
            //                     if (first > last) {
            //                         color = "red";
            //                         dif = last - first
            //                     } else { dif = first - last }
            //                     ;
                                
            //                     // setTimeout(function () {
            //                     //     //
            //                     // }, 550)
            //                     this.setState({
            //                         stocksDetails: stocksDetails,
            //                         req: req,
            //                         theLast,
            //                         dataMin,
            //                         dataMax,
            //                         color,
            //                         dif,
            //                         last,
            //                         first
            //                         // trimmed: trimmed
            //                     }, this.render)
            //                     // setTimeout(function () {
            //                     //     //
            //                     // }, 100)
            //                 }
            //             }
            //             else{
            //                 this.setState({
            //                 stocksDetails: stocksDetails,
            //                 req: req,
                           
            //                 // trimmed: trimmed
            //             })
            //         }

            //         })
            // })
        // }

    }
    render(){
       
        let stocks = this.state.stocks

          const { 
            theLast,
            dataMin,
            dataMax,
            color,
            dif,
        } = this.state;
        let STATE = this.state;
        // debugger;
        return (
            <div>
                
                    <div className="port-list"> 
                         <div className="porheader">
                            <h2 className="portfolio-header">Investing</h2>
                            <h3 className="portfolio-header">${theLast[0] ? `${parseFloat(parseFloat(theLast[theLast.length-1].average).toFixed(2)).toLocaleString()}` : ""}</h3>
                        <h4 className="portfolio-header">{dif > 0 ? "+" : ""} {dif.toFixed(2)} {dif > 0 ? "+" : ""} ({theLast[0] ? ((dif / theLast[0].average * 100).toFixed(2)): ""}%) </h4>
                            <LineChart className="linechart" width={700} height={200} data={theLast[0]? theLast : []}>
                                <XAxis dataKey="time" hide={true}></XAxis>
                                    <YAxis dataKey="average" domain={[dataMin, dataMax]} axisLine={false} hide={true}/>
                                <Tooltip></Tooltip>
                                    <Line type="monotone" dataKey="average" stroke={color} dot={false} strokeWidth='2' animationDuration={1500} />
                            </LineChart>
                        </div>
                        
                
                        <div className="stocklist-container">
                            <h1>Stocks</h1>
                            
                            {Object.keys(stocks).map(stock => {
                                debugger;
                                return(
                                    stocks[stock] && stocks[stock].amountt > 0 ? 
                                    <Link to={`/stocks/${stock}`} key={stock}>
                                        <div className="list-stock-parent" >
                                            <div className="list-stock" >
                                                <h4>{stock.toUpperCase()}</h4>
                                                <p>{stocks[stock].amountt} shares</p>
                                            </div>
                                       

                                            <div>
                                                {stocks[stock].stockDif >= 0 ?
                                                
                                                        <div>
                                                            <h5>${stocks[stock].lastPrice.toFixed(2)}</h5>
                                                            <h5 className="stocklist-plus">+{(stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2)}%</h5>
                                                        </div>
                                                        : 
                                                        <div>
                                                            <h5>${stocks[stock].lastPrice.toFixed(2)}</h5>
                                                            <h5 className="stocklist-minus">{(stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2)}%</h5>
                                                        </div>

                                                }
                                            </div>
                                        </div> 
                                    </Link>
                                    : ""
                                )
                                }   
                            )}
                        </div>
                    </div>
            </div>
        )
    }
}

export default Portfolio;