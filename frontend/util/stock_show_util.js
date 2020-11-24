import {fetchDailyStockData} from "./stock_util"

const stockShowUtil = () => {
    let ticker = this.props.location.pathname.split("/")[2]
// this.props.fetchStock(ticker.toUpperCase())
// debugger;

fetchDailyStockData(ticker.toUpperCase())
    // this.props.pullStockDetails(ticker.toUpperCase())
    .then(data => {
        // debugger

        const data1 = data.filter(arr => (arr.average != null))
        const dif = data1[data1.length - 1].average - data1[0].average;

        const percentChange = (dif / data1[0].average).toFixed(2)
        const low = data1.reduce(function (prev, current) {
            return (prev.low < current.low) ? prev : current
        })
        // debugger;
        const high = data1.reduce(function (prev, current) {
            return (prev.high < current.high) ? prev : current
        })

        const currentPrice = data1[data1.length - 1].average
        const color = dif < 0 ? "red" : '#21ce99'


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
            CustomTooltip: CustomTooltip,
            currentPrice: currentPrice, color: color
        })

    })}

    export default stockShowUtil;