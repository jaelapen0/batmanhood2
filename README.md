# README

# Overview
Batmanhood is a full stack web app that imitates the qualities and features of Robinhood. The purpose of Batmanhiid is to showcase the same functionalities of Robinhood such as simulating trades or managing portfolios, while using APIs to dynamically fetch real time data and Recharts to graph it out. The money used in this application is imaginery, and we are not regulated by financial institutions :) 


# Site

* https://batmanhood-aa.herokuapp.com/
## ![alt text](https://github.com/jaelapen0/batmanhood2/blob/main/app/assets/images/batmanhood480.gif?raw=true)

# Under the Hood
* This full stack application was built on the Ruby on Rails framework, utilizing PSQL as the database, ruby for backend and React/HTML/CsSS for 

# Frontend
* React-Redux
* HTML
* CSS

# Backend
* PSQL
* Ruby

# External Libraries / APIs
* Recharts (for graphing out data)
* NewsApi (News API for stock specific news)
* Financial Model Prep API (company profile data)
* IEXCloud API (real time data)
* GNews API 

# Challenges

* One of the challenges was figuring out how to reduce the amount of API requests, especially on the home page (while logged in), for every stock in the users portfolio/watchlist.  For stocks in the watchlist, I checked to see if the same stock was in the portfolio list as well, then reuse the data if possible. If not then make a fresh API request.

```
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
      

```

* Another challenge I dealt with, was figuring out how to put together the data for the home page portfolio chart. Combining the user's buying power, plus fetching stock for each stock the user has, then adding the values of each stock for the given timepoint. There would also be an occasional null value in the response data from the API, so that would have to checked as well. Ton's of data cleaning/process went into this portfolio.

```
  this.props.fetchOrderHistory()
            .then(orders => {

                let allOrders = orders.orderHistory;

                for (let i = 0; i < allOrders.length; i++) {
                    // ;
                    if (stocks[allOrders[i].ticker_symbol]) {
                        if (allOrders[i].order_type === "buy") {
                            stocks[allOrders[i].ticker_symbol].amountt += allOrders[i].shares_quantity
                        }
                        else if (allOrders[i].order_type === "sell") {
                            stocks[allOrders[i].ticker_symbol].amountt -= allOrders[i].shares_quantity
                        }
                    } else {
                        stocks[allOrders[i].ticker_symbol] = {}
                        stocks[allOrders[i].ticker_symbol].amountt = allOrders[i].shares_quantity

                    }
                }
                // ;
            }
        )
        .then(() => {
        Object.keys(stocks).forEach(name => {
            // ;
            if (stocks[name].amountt > 0){

                    this.props.pullStockDetails(name)
                        .then(data => {
                            const quantity = stocks[name].amountt
                            const req = Object.keys(stocks).length
                            let reqMet = 0;
                            // const data1 = data.filter(arr => (arr.average != null))
                            stocks[name].firstPrice = 0;
                            stocks[name].lastPrice = 0;
                            stocks[name].stockDif = 0;
                            let data2 = []
                            data2.data = data.data.filter(arr => (arr.average != null))
                            stocks[name].data = data2; 
                            stocks[name].low = data.data.reduce(function (prev, current) {
                                return (prev.low < current.low) ? prev : current
                            })
                            // ;
                            stocks[name].high = data.data.reduce(function (prev, current) {
                                return (prev.high < current.high) ? prev : current
                            })
                            const data1 = data.data.forEach(minInfo => {
                                // ;
                                if (minInfo.average != null) {
                                    if (!stocksDetails[minInfo.label]) {
                                        stocksDetails[minInfo.label] = [];

                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.label].push(totalAmount);
                                    }
                                    else {
                                        let totalAmount = minInfo.average * quantity
                                        stocksDetails[minInfo.label].push(totalAmount);
                                    }
                                    
                                    if (stocks[name].firstPrice === 0) stocks[name].firstPrice = minInfo.average;
                                    // ;
                                    if (minInfo.average != 0) {
                                        stocks[name].lastPrice = minInfo.average;
                                        stocks[name].stockDif = stocks[name].lastPrice - stocks[name].firstPrice;
                                    }
                                    // ;
                                }
                                if (stocksDetails[minInfo.label] && stocksDetails[minInfo.label].length > 0) {
                                    reqMet += 1
                                };
                            })
                            // 
                            if (reqMet / Object.keys(stocksDetails).length > .4) {
                                const theLast = [];
                                let dataMin = 10000000000
                                let dataMax = 0
                                let color = "#21ce99"
                                let dif = 0;
                                let last = 0;
                                let first = 0;
                                let trimmed = {}
                                
                                Object.keys(stocksDetails).forEach(min => {
                                    // 
                                    if (stocksDetails[min].length === req) {
                                        
                                        stocksDetails[min].push(parseInt(buyingPower))
                                        let added = stocksDetails[min].reduce((sum, x) => sum + x)
                                        if (added < dataMin) { dataMin = added }
                                        if (added > dataMax) { dataMax = added }
                                        theLast.push({ time: min, average: added.toFixed(2) });
                                    }
                                })

                                if (theLast.length > 0) {
                                    first += parseFloat(theLast[0].average)
                                    last += parseFloat(theLast[theLast.length - 1].average)
                                    if (first > last) {
                                        color = "red";
                                        dif = last - first
                                    } else { dif = last - first }
                                    // ;

                                    let currentPrice = theLast[theLast.length - 1].average
                                    this.setState({
                                        stocksDetails: stocksDetails,
                                        req: req,
                                        theLast,
                                        dataMin,
                                        dataMax,
                                        color,
                                        dif,
                                        last,
                                        first,
                                        stocks,
                                        completed: true,
                                        currentPrice
                                        // [name]: {firstPrice, lastPrice}
                                    
                                    }, this.render)
                                    
                                }
                            }
                                else {
                                    // ;
                                    this.setState({
                                        stocksDetails: stocksDetails,
                                        req: req,
                                    })
                                }

                        })
            
            }
            else{delete stocks[name]}
        })
        })
    }
   ```

# Upcoming
* Adding historical information for Weekly, Monthly, Yearly
