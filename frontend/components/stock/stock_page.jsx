import React from "react"
import {fetchDailyStockData, fetchCompanyNews} from "../../util/stock_util"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import _ from 'lodash'
import CompanyProfile from "./company_profile_container"
import StockNews from "./stock_news_container"
class StockPage extends React.Component {
    constructor(props) {
        super(props)

    }
 
    componentDidMount() {
        let ticker = this.props.location.pathname.split("/")[2]
        this.props.fetchStock(ticker.toUpperCase())
        // debugger;
      
        fetchDailyStockData(ticker.toUpperCase())
            .then(data => {
                // debugger

                const data1 = data.filter(arr => (arr.average != null))
                const dif  = data1[data1.length - 1].average - data1[0].average;
                
                const percentChange = (dif / data1[0].average).toFixed(2)
                const low = data1.reduce(function (prev, current) {
                    return (prev.low < current.low) ? prev : current
                })
                debugger;
                const high = data1.reduce(function (prev, current) {
                    return (prev.high < current.high) ? prev : current
                })

                const currentPrice = data1[data1.length-1].average
                const color =  dif < 0 ? "red" : '#21ce99' 

                this.setState({ data: data1, low: low.low, high: high.high, 
                               dif: dif.toFixed(2), percentChange: percentChange, 
                               currentPrice: currentPrice, color: color })
            })
            
            // fetchCompanyNews(ticker)
            // .then(news => {
            //     debugger;

            //     this.setState({news: news})
            // })
    }

    componentDidUpdate(prevProps) {
      
    }


    render() {
        debugger;
        let ticker = this.props.location.pathname.split("/")[2]
        
        return (

            <div className="stockshow-container">
                {this.state?
                    (<div>
                    <h3 className="show-header">{ticker.toUpperCase()}</h3>
                    <h2>${this.state.currentPrice.toFixed(2)}</h2>
                    
                    <h3>${this.state.dif} ({this.state.percentChange})% Today </h3>
                    <LineChart className="linechart" width={670} height={200} data={this.state.data}>
                        {/* <YAxis tick={<CustomizedTickY locale={locale} />} domain={['dataMin', 'dataMax']} /> */}
                        <Tooltip></Tooltip>
                        <YAxis domain={[this.state.low.toFixed(2), this.state.high.toFixed(2)]}/>
                        <Line type="monotone" dataKey="average" stroke={this.state.color} dot={false} strokeWidth='3' animationDuration={1500} />
                    </LineChart>
                    <br/>
                    <CompanyProfile ticker={ticker}/>
                    <StockNews ticker={ticker}/>
                </div>): "" }
             </div>

            
        )
    }
}

export default StockPage;