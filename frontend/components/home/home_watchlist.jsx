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
      // ;
      // if (Object.keys(this.props.parentState.stocks).length > 0 && Object.keys(this.props.parentState.stocks).length != Object.keys(prevProps.parentState.stocks).length)
      if (this.props.parentState.completed && !prevProps.parentState.completed)
      {
         // ;
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
               // ;


            }
            else{
             notReadyStocks.push(watchlists[i].ticker_symbol);
            }
         }
         // ;
         
         this.setState({stocks: readyStocks, notReadyStocks})
         // ;

         for (let i = 0; i < notReadyStocks.length; i++) {
            let ticker = notReadyStocks[i]
            let state= this.state;
            this.props.pullStockDetails(ticker)
            
            .then((details, notReadyStocks) =>{
               // ;
              
               ;
               let nowReadyStocks = state.nowReadyStocks // creating copy of state variable jasper
               ;
               
               nowReadyStocks[ticker] = {};
               nowReadyStocks[ticker]["firstPrice"] = details.data[0].average; 
               nowReadyStocks[ticker]["lastPrice"] = details.data[details.data.length-1].average; 
               nowReadyStocks[ticker]["stockDif"] = details.data[details.data.length - 1].average - details.data[0].average;   // update the name property, assign a new value                 
               
               let data2 = []
               data2.data = details.data.filter(arr => (arr.average != null))
               nowReadyStocks[ticker].data = data2;
               nowReadyStocks[ticker].low = nowReadyStocks[ticker].data.data.reduce(function (prev, current) {
                  return (prev.low < current.low) ? prev : current
               })
               nowReadyStocks[ticker].high = nowReadyStocks[ticker].data.data.reduce(function (prev, current) {
                  return (prev.high < current.high) ? prev : current
               })
               // ;
               this.setState({ nowReadyStocks})
            })
         }
         // ;
      }
   }

   render() {
      // ;
      let {stocks} = this.state
      let {nowReadyStocks} = this.state;
      // ;
      return (
         <div>
            <h1 className="watchlist-container-h1" >Watchlist</h1>
            {this.state.nowReadyStocks ? 
                  Object.keys(nowReadyStocks).map(stock => {
                     
                     // let low = nowReadyStocks[stock].data.data.reduce(function (prev, current) {
                     //    return (prev.low < current.low) ? prev : current
                     // })
                     // // ;
                     // let high = nowReadyStocks[stock].data.data.reduce(function (prev, current) {
                     //    return (prev.high < current.high) ? prev : current
                     // })
                     ;
                     return (
         
                           <Link to={`/stocks/${stock}`} key={stock}>
                              <div className="list-watch-parent" >
                                 <div className="list-stock" >
                                    <h4>{stock.toUpperCase()}</h4>
                                 </div>
                              <LineChart
                                 className="stocks-chart"
                                 width={70} height={45} data={nowReadyStocks[stock].data.data}>
                                 <XAxis dataKey="label" hide={true}></XAxis>
                                 <YAxis dataKey="average" domain={[nowReadyStocks[stock].low, nowReadyStocks[stock].high]} axisLine={false} hide={true} />                                 
                                 
                                 {nowReadyStocks[stock].stockDif >= 0.0 ?
                                    <Line type="monotone" dataKey="average" stroke={"#21ce99"} dot={false} strokeWidth='1' />
                                    :
                                    <Line type="monotone" dataKey="average" stroke={"red"} dot={false} strokeWidth='1' />

                                 }
                              </LineChart>
                                 
                                 <div>
                                    {this.state.nowReadyStocks[stock].stockDif >= 0 ?

                                       <div className="watchlist-right">
                                          <h5>${this.state.nowReadyStocks[stock].lastPrice.toFixed(2)}</h5>
                                       <h5 className="watchlist-plus">+{(this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100).toFixed(2)}%</h5>
                                       </div>
                                       :
                                       <div className="watchlist-right">
                                          <h5>${this.state.nowReadyStocks[stock].lastPrice.toFixed(2)}</h5>
                                       <h5 className="watchlist-minus">{(this.state.nowReadyStocks[stock].stockDif / this.state.nowReadyStocks[stock].lastPrice * 100).toFixed(2)}%</h5>
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
               // 
               // let low = stocks[stock].data.data.reduce(function (prev, current) {
               //    return (prev.low < current.low) ? prev : current
               // })
               //              // ;
               // let high = stocks[stock].data.data.reduce(function (prev, current) {
               //    return (prev.high < current.high) ? prev : current
               // })
               // 
               return (
                  stocks[stock] && stocks[stock].lastPrice > 0 ?
                     <Link to={`/stocks/${stock}`} key={stock}>
                        <div className="list-watch-parent" >
                           <div className="list-stock" >
                              <h4>{stock.toUpperCase()}</h4>
                              {/* <p>{stocks[stock].amountt} shares</p> */}
                           </div>

                           <LineChart key={`chart-${stock}`}
                              className="stocks-chart"
                              width={70} height={45} data={stocks[stock].data.data}>
                              <XAxis dataKey="label" hide={true}></XAxis>
                              <YAxis dataKey="average" domain={[stocks[stock].low.low, stocks[stock].high.high]} axisLine={false} hide={true} />
                              {stocks[stock].stockDif >= 0 ? 
                                 <Line type="monotone" dataKey="average" stroke={"#21ce99"} dot={false} strokeWidth='1' />
                                       :
                                 <Line type="monotone" dataKey="average" stroke={"red"} dot={false} strokeWidth='1' />

                              }
                                 </LineChart>
                           <div>
                              
                              {stocks[stock].stockDif >= 0 ?


                                 <div className="watchlist-right"> 
                                    <h5>${stocks[stock].lastPrice.toFixed(2)}</h5>
                                    <h5 className="watchlist-plus">+{(stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2)}%</h5>
                                 </div>
                                 :
                                 <div className="watchlist-right"> 
                                    <h5>${stocks[stock].lastPrice.toFixed(2)}</h5>
                                    <h5 className="watchlist-minus">{(stocks[stock].stockDif / stocks[stock].lastPrice * 100).toFixed(2)}%</h5>
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