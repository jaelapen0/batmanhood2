import React from "react"
import {fetchDailyStockData} from "../../util/stock_util"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import _ from 'lodash'
import CompanyProfile from "./company_profile_container"
class StockPage extends React.Component {
    constructor(props) {
        super(props)

    }
 
    componentDidMount() {
        let ticker = this.props.location.pathname.split("/")[2]
        this.props.fetchStock(ticker.toUpperCase())
        debugger;
      
        fetchDailyStockData(ticker.toUpperCase())
            .then(data => {
                debugger

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
   
    }

    componentDidUpdate(prevProps) {
        // prevProps -> props prior to update (react will provide this arg)
        // we need this so can fetch a new drop if we navigate to a different drop's show page
        // debugger
        // if (this.props.match.params.dropId !== prevProps.match.params.dropId) {
        //     this.props.fetchDrop(this.props.match.params.dropId);
        // }
       
        
    }


    render() {
        debugger;
        let ticker = this.props.location.pathname.split("/")[2]
        
        return (

            <div className="stockshow-container">
                <h3 className="show-header">{ticker.toUpperCase()}</h3>
                <h2>${this.state ? this.state.currentPrice.toFixed(2) : 0}</h2>
                
                <h3>${this.state ? this.state.dif : 0} ({this.state ? this.state.percentChange : 0})% Today </h3>


                <LineChart className="linechart" width={670} height={200} data={this.state ? this.state.data : []}>
                    {/* <YAxis tick={<CustomizedTickY locale={locale} />} domain={['dataMin', 'dataMax']} /> */}
                    <Tooltip></Tooltip>
                    <YAxis domain={this.state ? [this.state.low.toFixed(2), this.state.high.toFixed(2)] : [0, 0]}/>
                    <Line type="monotone" dataKey="average" stroke={this.state ? this.state.color : '#21ce99'} dot={false} strokeWidth='3' animationDuration={2000} />
                </LineChart>
                <br/>
                <CompanyProfile ticker={ticker}/>
            </div>

            
        )
    }
}

export default StockPage;