import React from "react"
import {fetchDailyStockData} from "../../util/stock_util"
import { LineChart, Line } from 'recharts';
class StockPage extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {data: ""}
    }
    componentDidMount() {
       
        let ticker = this.props.location.pathname.split("/")[2]
        this.props.fetchStock(ticker.toUpperCase())
        debugger;
       const info = {}
        fetchDailyStockData(ticker.toUpperCase())
            .then(data => {
                // debugger;
                // object.assign(info, data)
                this.setState({ ticker, data: data.filter(arr => (arr.average != null)) })
            })
        // debugger
        // this.state.data.filter(arr => (arr.average != null))
    }

    componentDidUpdate(prevProps) {
        // prevProps -> props prior to update (react will provide this arg)
        // we need this so can fetch a new drop if we navigate to a different drop's show page
        // debugger
        // if (this.props.match.params.dropId !== prevProps.match.params.dropId) {
        //     this.props.fetchDrop(this.props.match.params.dropId);
        // }
    }

    // update(field){
    //     // return e => this.setState({ [field]: e.currentTarget.value })
    //     // return e => this.setState({ stock_price: "", stock_data: {} })
    //     // fetchDailyStockData
    //    let ticker = this.props.location.pathname.split("/")[2]
    // //    fetchDailyStockData(ticker.toUpperCase())
    // //         .then(data => {
    // //             this.setState({ data: data })
    // //         })
    // }

    render() {
        // this.setState({ stock_price: "", stock_data: {} })
        // debugger;
        let ticker = this.props.location.pathname.split("/")[2]
        // this.props.fetchStock(ticker.toUpperCase())
        debugger;
        // this.state.data.forEach(info => { <p>{info.average}</p> })
        // this.state.data.forEach(info => { console.log(info.average)})
        // <p >{this.state ? this.state.data.map(info => (
        //     info + ". "
        // )) : null}</p>
        return (
            <div className="watchlist-container">
                <h3 className="watchlist-header">{ticker.toUpperCase()}</h3>
                <p>

                    {this.state ? this.state.data.map(info => (
                        info.label + " : $" + info.average + " \n"
                    )) : null}
                    {/* {this.state ? 
                        this.state.data[this.state.data.length - 1].average : ""} */}
                    {/* onChange={this.componentDidMount()}
                    // onChange={this.update("data")} */}
                </p>
            </div>
        )
    }
}

export default StockPage;