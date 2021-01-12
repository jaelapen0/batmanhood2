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
    }
    componentDidUpdate(prevProps, prevState){
        if (this.props.stocks && Object.keys(this.props.stocks).length > 0 && prevProps.stocks != this.props.stocks){
            const stocksDetails = {};
            const { stocks, buyingPower} = this.props;
            Object.keys(stocks).forEach(name => {
                this.props.pullStockDetails(name)
                    .then(data => {
                        // ;
                        const quantity = stocks[name]
                        const req = Object.keys(stocks).length
                        // ;
                        let reqMet = 0;
                        const data1 = data.data.forEach(minInfo => {
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
                            }
                            if (stocksDetails[minInfo.minute] && stocksDetails[minInfo.minute].length > 0) {
                                // debugger;
                                reqMet += 1};
                        })
                        // ;

                        if (reqMet / Object.keys(stocksDetails).length > .4){
                            const theLast = [];
                            let dataMin = 10000000000
                            let dataMax = 0
                            let color = "#21ce99"
                            let dif = 0;
                            let last = 0;
                            let first = 0;
                            let trimmed = {}

                            Object.keys(stocksDetails).forEach(min => {
                                // ;
                                if (stocksDetails[min].length === req) {
                                    // ;
                                    stocksDetails[min].push(parseInt(buyingPower))
                                    let added = stocksDetails[min].reduce((sum, x) => sum + x)
                                    if (added < dataMin) { dataMin = added }
                                    if (added > dataMax) { dataMax = added }
                                    theLast.push({ time: min, average: added.toFixed(2) });
                                }
                            })
                            
                            if (theLast.length > 0){
                                first += parseFloat(theLast[0].average)
                                
                                last += parseFloat(theLast[theLast.length - 1].average)
                                if (first > last) {
                                    color = "red";
                                    dif = last - first
                                } else { dif = first - last }

                                this.setState({
                                    stocksDetails: stocksDetails,
                                    req: req,
                                    theLast,
                                    dataMin,
                                    dataMax,
                                    color,
                                    dif,
                                    last,
                                    first
                                    // trimmed: trimmed
                                })
                            }
                        }
                        else{
                            this.setState({
                            stocksDetails: stocksDetails,
                            req: req,
                           
                            // trimmed: trimmed
                        })
                    }

                    })
            })
        }

    }
    render(){
       
        let stocks = this.props.stocks

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
                                // ;
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