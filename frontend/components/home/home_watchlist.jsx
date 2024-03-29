import React from "react"
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class HomeWatchlist extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         stocks: {},
         nowReadyStocks: {}
      }
   }

   componentDidMount() {
      this.props.fetchWatchLists()
         .then(results => {
            ;
            this.setState({ results })
         })
   }

   componentDidUpdate(prevProps, prevState){
      if (this.props.parentState.completed && !prevProps.parentState.completed)
      { 

         let readyStocks = {};
         let notReadyStocks = [];
         let watchlists = this.state.results.watchlists;
         let stocks = this.props.parentState.stocks;

         for (let i = 0; i < watchlists.length; i++) {
            if (stocks[watchlists[i].ticker_symbol]){
               readyStocks[watchlists[i].ticker_symbol] = stocks[watchlists[i].ticker_symbol]
               
               readyStocks[watchlists[i].ticker_symbol].low = stocks[watchlists[i].ticker_symbol].data.data.reduce(function (prev, current) {
                  return (prev.low < current.low) ? prev : current
               })
              readyStocks[watchlists[i].ticker_symbol].high = stocks[watchlists[i].ticker_symbol].data.data.reduce(function (prev, current) {
                  return (prev.high < current.high) ? prev : current
               })
            }
            else{
             notReadyStocks.push(watchlists[i].ticker_symbol);
            }
         }
         
         this.setState({stocks: readyStocks, notReadyStocks})
 
         for (let i = 0; i < notReadyStocks.length; i++) {
            let ticker = notReadyStocks[i]
            let state= this.state;
            this.props.pullStockDetails(ticker)
            
            .then((details, notReadyStocks) =>{
              
               let nowReadyStocks = state.nowReadyStocks 
               nowReadyStocks[ticker] = {};
               // nowReadyStocks[ticker]["firstPrice"] = details.data[0]?.open; 

               // nowReadyStocks[ticker]["lastPrice"] = details.data[details.data.length-1]//.open; 

               // nowReadyStocks[ticker]["stockDif"] = details.data[details.data.length - 1]?.open - details.data[0]?.open;
               let data2 = []
               data2.data = details.data.filter(arr => (arr.open != null))
               nowReadyStocks[ticker].data = data2;
               nowReadyStocks[ticker].low = nowReadyStocks[ticker].data.data.reduce(function (prev, current) {
                  return (prev.low < current.low) ? prev : current
               })
               nowReadyStocks[ticker].high = nowReadyStocks[ticker].data.data.reduce(function (prev, current) {
                  return (prev.high < current.high) ? prev : current
               })
               
               this.setState({ nowReadyStocks})
            })
         }
      
      }
   }

   render() {

      let {stocks} = this.state
      let {nowReadyStocks} = this.state;
      return (
         <div>
            <h1 className="watchlist-container-h1" >Watchlist</h1>
            {this.state.nowReadyStocks ? 
                  Object.keys(nowReadyStocks).map(stock => {
                     
                     return (
         
                           <Link to={`/stocks/${stock}`} key={stock}>
                              <div className="list-watch-parent" >
                                 <div className="list-stock" >
                                    <h4>{stock.toUpperCase()}</h4>
                                 </div>
                              <LineChart
                                 className="stocks-chart2"
                                 width={70} height={45} data={nowReadyStocks[stock].data.data}>
                                 {/* <XAxis dataKey="label" hide={true}></XAxis> */}
                                 <YAxis dataKey="open" domain={[nowReadyStocks[stock].low, nowReadyStocks[stock].high]} axisLine={false} hide={true} />                                 
                                 
                                 {nowReadyStocks[stock].stockDif >= 0.0 ?
                                    <Line type="monotone" dataKey="open" stroke={"#21ce99"} dot={false} strokeWidth='1' />
                                    :
                                    <Line type="monotone" dataKey="open" stroke={"red"} dot={false} strokeWidth='1' />

                                 }
                              </LineChart>
                                 
                                 <div>
                                 {this.state.nowReadyStocks[stock].stockDif >= 0 && this.state.nowReadyStocks[stock].lastPrice ?

                                       <div className="watchlist-right">
                                       <h5>${this.state.nowReadyStocks[stock].lastPrice ? this.state.nowReadyStocks[stock].lastPrice.toFixed(2) : ""}</h5>
                                       <h5 className="watchlist-plus">+{this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100 != null ? (this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100).toFixed(2) : ""}%</h5>
                                       </div>
                                       :
                                       <div className="watchlist-right">
                                       <h5>${this.state.nowReadyStocks[stock].lastPrice ?this.state.nowReadyStocks[stock].lastPrice.toFixed(2): ""}</h5>
                                       <h5 className="watchlist-minus">{this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100 != null ? (this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100).toFixed(2) : "" }% </h5>
                                       </div>
                                    }
                                 </div>
                              </div>
                           </Link>
                           
                     )
                  }
                  )
               : ""}
               
            
            {Object.keys(stocks).map(stock => {
               ;
               return (
                  stocks[stock] && stocks[stock].lastPrice > 0 ?
                     <Link to={`/stocks/${stock}`} key={stock}>
                        <div className="list-watch-parent" >
                           <div className="list-stock" >
                              <h4>{stock.toUpperCase()}</h4>
                              {/* <p>{stocks[stock].amountt} shares</p> */}
                           </div>

                           <LineChart key={`chart-${stock}`}
                              className="stocks-chart2"
                              width={70} height={45} data={stocks[stock].data.data}>
                              <XAxis dataKey="label" hide={true}></XAxis>
                              <YAxis dataKey="open" domain={[stocks[stock].low.low, stocks[stock].high.high]} axisLine={false} hide={true} />
                              {stocks[stock].stockDif >= 0 ? 
                                 <Line type="monotone" dataKey="open" stroke={"#21ce99"} dot={false} strokeWidth='1' />
                                       :
                                 <Line type="monotone" dataKey="open" stroke={"red"} dot={false} strokeWidth='1' />

                              }
                                 </LineChart>
                           <div>
                              
                              {stocks[stock].stockDif >= 0 ?
                                 
                                 <div className="watchlist-right"> 
                                    <h5>${stocks[stock].lastPrice ? stocks[stock].lastPrice.toFixed(2) : ""}</h5>
                                    <h5 className="watchlist-plus">+{stocks[stock].stockDif / stocks[stock].lastPrice * 100 != null ? (stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2) : ""}%</h5>
                                 </div>
                                 :
                                 <div className="watchlist-right"> 
                                    <h5>${stocks[stock].lastPrice ? stocks[stock].lastPrice.toFixed(2) :""}</h5>
                                    <h5 className="watchlist-minus">{stocks[stock].stockDif / stocks[stock].lastPrice * 100 != null ? (stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2) : ""}%</h5>
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
      )
   }
}

export default HomeWatchlist;