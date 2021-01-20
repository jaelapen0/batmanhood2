import React from "react"
import { fetchDailyStockData, fetchCompanyNews, fetchHistoricStockData } from "../../util/stock_util"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import _ from 'lodash'
import CompanyProfile from "./company_profile_container"
import StockNews from "./stock_news_container"
import { Link } from 'react-router-dom';
import OrderForm from "./order_form_container"
class StockPage extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            label: "label",
            key: "average",
            timeframe: "Today"
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this);
        this.fetchStockInfo = this.fetchStockInfo.bind(this);
        this.fetchHistoricStockInfo = this.fetchHistoricStockInfo.bind(this);
    }

  
    fetchStockInfo(e){

        if (e){
            e.currentTarget.style.color = this.state.color;
        }
        let ticker = this.props.location.pathname.split("/")[2]
        fetchDailyStockData(ticker.toUpperCase())
            .then(data => {
                // const data1 = data.historical.reverse().filter(arr => (arr.open != null))

                let data1 = data.filter(arr => (arr.average != null))
                let dif = data1[data1.length - 1].average - data1[0].average;

                let percentChange = ((dif / data1[0].average) * 100).toFixed(2)
                let low = data1.reduce(function (prev, current) {
                    return (prev.low < current.low) ? prev : current
                })
                // ;
                let high = data1.reduce(function (prev, current) {
                    return (prev.high < current.high) ? prev : current
                })

                let currentPrice = data1[data1.length - 1].open
                let color = dif < 0 ? "red" : '#21ce99'
                let setColor = color


                if (dif > 0) {
                    dif = `+$${dif.toFixed(2)}`
                }
                else {

                    dif = `-$${Math.abs(dif).toFixed(2)}`
                }
                debugger;
                
                for (let i = 0; i < document.getElementsByClassName("chartOption").length; i++) {
                    document.getElementsByClassName("chartOption")[i].style.color = ""
                }
                if (document.getElementById("1")) {
                    document.getElementById("1").style.color = "#21ce99";
                }
                this.setState({
                    data: data1, low: low.low, high: high.high,
                    dif, percentChange,
                    currentPrice, color, ticker,
                    setColor,
                    label: "label",
                    key: "average",
                    timeframe: "Today",
                    orderPrice: currentPrice
                })

            })


    }

    fetchHistoricStockInfo(e){
        let ticker = this.props.location.pathname.split("/")[2]
        debugger;
        let timeframe = "";

        for (let i = 0; i < document.getElementsByClassName("chartOption").length; i++) {
            document.getElementsByClassName("chartOption")[i].style.color = ""
        }
        
        e.currentTarget.style.color = "#21ce99";
        if (e.currentTarget.id === "7") { timeframe = "Past Week"}
        if (e.currentTarget.id ==="30") {  timeframe = "Past Month" }
        if (e.currentTarget.id === "365") {  timeframe = "Past Year" }
        if (e.currentTarget.id === "1461") {  timeframe = "Past 5 Years" }
        if (e.currentTarget){
            fetchHistoricStockData(ticker, e.currentTarget.id)
                .then(data => {
                    debugger;
                    let data2 = data.reverse().filter(arr => (arr.open != null))
                    debugger;
                    // data2[data2.length - 1].open = this.state.currentPrice;
                    // const data2 = data.filter(arr => (arr.open != null))
                    let dif = data2[data2.length - 1].open - data2[0].open;

                    let percentChange = ((dif / data2[0].open) * 100).toFixed(2)
                    let low = data2.reduce(function (prev, current) {
                        return (prev.low < current.low) ? prev : current
                    })
                    // ;
                    let high = data2.reduce(function (prev, current) {
                        return (prev.high < current.high) ? prev : current
                    })

                    // const currentPrice = data2[data2.length - 1].open
                    let color = dif < 0 ? "red" : '#21ce99'
                    let setColor = color


                    if (dif > 0) {
                        dif = `+$${dif.toFixed(2)}`
                    }
                    else {

                        dif = `-$${Math.abs(dif).toFixed(2)}`
                    }
                    debugger;
                    this.setState({
                        data: data2, low: low.open, high: high.open,
                        // dif, percentChange,
                        // currentPrice, ticker,
                        setColor,
                        label: "date",
                        key: "open",
                        timeframe
                    })

                })
            }

    }
    componentDidMount() {
        this.fetchStockInfo()
    }

    componentDidUpdate(prevProps) {
        let ticker = this.props.location.pathname.split("/")[2]
        let prevTicker = prevProps.location.pathname.split("/")[2]

        if (ticker !== prevTicker) {
            this.fetchStockInfo()
        }
    }
    componentWillUnmount() {

    }

    handleMouseMove(e) {
        if (e.activePayload) {

            ;
            let currentPrice = e.activePayload[0].value
            if (currentPrice === null) {
                return null;
            }
            let dif = (currentPrice - this.state.data[0].open).toFixed(2)
            let color = dif < 0 ? "red" : '#21ce99'
            
            let percentChange = parseFloat(dif / this.state.data[0].open * 100).toFixed(2)
            if (dif > 0) dif = "+$" + dif;
            if (dif < 0) dif = "-$" + parseFloat(-dif).toFixed(2);
            
            this.setState({ currentPrice, dif, percentChange, color })
        }
    }

    handleMouseOff() {
        let currentPrice = this.state.data[this.state.data.length - 1].open
        let dif = (parseFloat(currentPrice - this.state.data[0].open)).toFixed(2)
        let color = dif < 0 ? "red" : '#21ce99'
        let percentChange = parseFloat(dif / this.state.data[0].open * 100).toFixed(2)
        if (dif > 0) dif = "+$" + Math.abs(dif).toFixed(2);
        if (dif < 0) dif = "-$" + Math.abs(dif).toFixed(2);
        this.setState({
            currentPrice,
            dif,
            percentChange,
            color,
            // setColor,
            
        })
    }



    render() {
        let ticker = this.props.location.pathname.split("/")[2]
        const { id } = this.props.currentUser


        function CustomToolTip({ payload, label, active }) {
            // ;
            if (active) {
                if (label && label.includes(":") === false) {
                    label = label.split(" ").join(":00 ")
                }
                return (
                    <div>
                        <p>{`${label}`}</p>
                    </div>
                );
            }

            return null;
        }

        
        return (

            <div className="stockshow-container">

                {this.state.currentPrice ?
                    (<div>

                        <h3 className="show-header">{ticker.toUpperCase()}</h3>
                        <h2>${this.state.currentPrice.toFixed(2)}</h2>

                        <span
                            className="span-header"
                            style={{ color: this.state.color }}
                            >{this.state.dif} ({this.state.percentChange})% </span>
                        < span className="span-header">{this.state.timeframe}</span>
                        <br />
                        <br />
                        <br />
                        <div className="show-top">
                         
                            <LineChart
                                onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseOff}
                                className="linechart" width={670} height={200} data={this.state.data}>
                                <XAxis dataKey={this.state.label} hide={true}></XAxis>
                                {/* <YAxis tick={<CustomizedTickY locale={locale} />} domain={['dataMin', 'dataMax']} /> */}
                                <YAxis dataKey="open" domain={[this.state.low.toFixed(2), this.state.high.toFixed(2)]} axisLine={false} hide={true} />
                                <Tooltip
                                    content={<CustomToolTip />}
                                    wrapperStyle={{ left: -35 }}
                                    allowEscapeViewBox={{ x: true, y: true }}
                                    position={{ y: -40 }} cursor={{ stroke: 'grey' }} isAnimationActive={false}
                                ></Tooltip>
                                <Line type="monotone" dataKey={this.state.key} stroke={this.state.color} dot={false} strokeWidth='2' animationDuration={1500} />
                            </LineChart>
                            
                            <OrderForm
                                color={this.state.setColor}
                                ticker={this.state.ticker}
                                currentUser={this.props.currentUser.id}
                                currentPrice={this.state.data ? this.state.orderPrice: undefined}  />
                        </div>
                        <br />
                        <i class="fa fa-spinner" aria-hidden="true"></i>
                        <div className="chart-toggler">
                            <div style={{ color: "#21ce99"}} onClick={this.fetchStockInfo} id="1" className="chartOption">1D</div>
                            <div onClick={this.fetchHistoricStockInfo} id="7" className="chartOption">1W</div>
                            <div onClick={this.fetchHistoricStockInfo} id="30" className="chartOption">1M</div>
                            {/* <div onClick={this.fetchHistoricStockInfo} id="365" className="chartOption">1Y</div> */}
                            {/* <div onClick={this.fetchHistoricStockInfo} id="1461" className="chartOption">5Y</div> */}
                        </div>
                        <br/>
                        <CompanyProfile ticker={ticker} />
                        <StockNews ticker={ticker} />
                    </div>) : ""}
            </div>


        )
    }
}

export default StockPage;