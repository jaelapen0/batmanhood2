import React from "react"
import { fetchDailyStockData, fetchCompanyNews } from "../../util/stock_util"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import _ from 'lodash'
import CompanyProfile from "./company_profile_container"
import StockNews from "./stock_news_container"
import { Link } from 'react-router-dom';
import OrderForm from "./order_form_container"
class StockPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this);
    }

    componentDidMount() {
        let ticker = this.props.location.pathname.split("/")[2]


        fetchDailyStockData(ticker.toUpperCase())
            .then(data => {

                const data1 = data.filter(arr => (arr.average != null))
                let dif = data1[data1.length - 1].average - data1[0].average;

                const percentChange = ((dif / data1[0].average) * 100).toFixed(2)
                const low = data1.reduce(function (prev, current) {
                    return (prev.low < current.low) ? prev : current
                })
                // ;
                const high = data1.reduce(function (prev, current) {
                    return (prev.high < current.high) ? prev : current
                })

                const currentPrice = data1[data1.length - 1].average
                const color = dif < 0 ? "red" : '#21ce99'
                const setColor = color

                const CustomTooltip = ({ active }) => {
                    if (active) {

                        return (
                            <div className="custom-tooltip">
                                <p className="label">{`${this.state.data[0].date} : ${this.state.data[0].average}`}</p>
                            </div>
                        );
                    }
                    return null;
                };

                if (dif > 0) {
                    dif = `+$${dif.toFixed(2)}`
                }
                else {

                    dif = `-$${Math.abs(dif).toFixed(2)}`
                }

                this.setState({
                    data: data1, low: low.low, high: high.high,
                    dif, percentChange,
                    CustomTooltip,
                    currentPrice, color, ticker,
                    setColor
                })

            })

        // 

    }

    componentDidUpdate(prevProps) {
        let ticker = this.props.location.pathname.split("/")[2]
        let prevTicker = prevProps.location.pathname.split("/")[2]

        if (ticker !== prevTicker) {

            fetchDailyStockData(ticker.toUpperCase())
                .then(data => {

                    const data1 = data.filter(arr => (arr.average != null))
                    const dif = data1[data1.length - 1].average - data1[0].average;

                    const percentChange = (dif / data1[0].average*100).toFixed(2)
                    const low = data1.reduce(function (prev, current) {
                        return (prev.low < current.low) ? prev : current
                    })
                    // ;
                    const high = data1.reduce(function (prev, current) {
                        return (prev.high < current.high) ? prev : current
                    })

                    const currentPrice = data1[data1.length - 1].average
                    const color = dif < 0 ? "red" : '#21ce99'
                    const setColor = color
                    const CustomTooltip = ({ active }) => {
                        if (active) {

                            return (
                                <div className="custom-tooltip">
                                    <p className="label">{`${this.state.data[0].date} : ${this.state.data[0].average}`}</p>
                                </div>
                            );
                        }
                        return null;
                    };

                    this.setState({
                        data: data1, low: low.low, high: high.high,
                        dif: dif.toFixed(2), percentChange: percentChange,
                        setColor,
                        currentPrice: currentPrice, color: color,
                        ticker
                    })

                })
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
            let dif = (currentPrice - this.state.data[0].average).toFixed(2)
            const color = dif < 0 ? "red" : '#21ce99'
            
            let percentChange = parseFloat(dif / this.state.data[0].average * 100).toFixed(2)
            if (dif > 0) dif = "+$" + dif;
            if (dif < 0) dif = "-$" + parseFloat(-dif).toFixed(2);
            
            this.setState({ currentPrice, dif, percentChange, color })
        }
    }

    handleMouseOff() {
        let currentPrice = this.state.data[this.state.data.length - 1].average
        let dif = (parseFloat(currentPrice - this.state.data[0].average)).toFixed(2)
        const color = dif < 0 ? "red" : '#21ce99'
        let percentChange = parseFloat(dif / this.state.data[0].average * 100).toFixed(2)
        if (dif > 0) dif = "+$" + Math.abs(dif).toFixed(2);
        if (dif < 0) dif = "-$" + Math.abs(dif).toFixed(2);
        this.setState({
            currentPrice,
            dif,
            percentChange,
            color
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

                {this.state ?
                    (<div>

                        <h3 className="show-header">{ticker.toUpperCase()}</h3>
                        <h2>${this.state.currentPrice.toFixed(2)}</h2>

                        <span
                            className="span-header"
                            style={{ color: this.state.color }}
                            >{this.state.dif} ({this.state.percentChange})% </span>
                        < span className="span-header">Today</span>
                        <br />
                        <br />
                        <br />
                        <div className="show-top">
                            <LineChart
                                onMouseMove={this.handleMouseMove} onMouseLeave={this.handleMouseOff}
                                className="linechart" width={670} height={200} data={this.state.data}>
                                <XAxis dataKey="label" hide={true}></XAxis>
                                {/* <YAxis tick={<CustomizedTickY locale={locale} />} domain={['dataMin', 'dataMax']} /> */}
                                <YAxis dataKey="average" domain={[this.state.low.toFixed(2), this.state.high.toFixed(2)]} axisLine={false} hide={true} />
                                <Tooltip
                                    content={<CustomToolTip />}
                                    wrapperStyle={{ left: -35 }}
                                    allowEscapeViewBox={{ x: true, y: true }}
                                    position={{ y: -30 }} cursor={{ stroke: 'grey' }} isAnimationActive={false}
                                ></Tooltip>
                                <Line type="monotone" dataKey="average" stroke={this.state.color} dot={false} strokeWidth='2' animationDuration={1500} />
                            </LineChart>

                            <OrderForm
                                color={this.state.setColor}
                                ticker={this.state.ticker}
                                currentUser={this.props.currentUser.id}
                                currentPrice={this.state.data ? this.state.data[this.state.data.length - 1].average : undefined}  />
                        </div>
                        <br />
                        <CompanyProfile ticker={ticker} />
                        <StockNews ticker={ticker} />
                    </div>) : ""}
            </div>


        )
    }
}

export default StockPage;