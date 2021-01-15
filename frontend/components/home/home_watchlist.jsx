import React from "react"
import { Link } from 'react-router-dom';

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
               nowReadyStocks[ticker]["stockDif"] = details.data[0].average - details.data[details.data.length - 1].average;   // update the name property, assign a new value                 
               ;
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
                        ;
                     return (
         
                           <Link to={`/stocks/${stock}`} key={stock}>
                              <div className="list-watch-parent" >
                                 <div className="list-stock" >
                                    <h4>{stock.toUpperCase()}</h4>
                                 </div>
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
            
               return (
                  stocks[stock] && stocks[stock].lastPrice > 0 ?
                     <Link to={`/stocks/${stock}`} key={stock}>
                        <div className="list-watch-parent" >
                           <div className="list-stock" >
                              <h4>{stock.toUpperCase()}</h4>
                              {/* <p>{stocks[stock].amountt} shares</p> */}
                           </div>
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