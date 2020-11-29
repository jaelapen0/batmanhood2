import * as StockUtils from "../util/stock_util"

export const RECEIVE_STOCK = "RECEIVE_STOCK"
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS"
export const RECEIVE_STOCK_DATA = "RECEIVE_STOCK_DATA"
export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH RESULTS"
const receiveStock = ticker_symbol => {
    return {
        type: RECEIVE_STOCK,
        ticker_symbol
    }
}

const receiveStocks = stocks => {
    return {
        type: RECEIVE_ALL_STOCKS,
        stocks
    }
}


const receiveStockData = data => {
    // ;
    return {
        type: RECEIVE_STOCK_DATA,
        data
    }
}

const receiveSearchResults = results => {
    return {
        type: RECEIVE_SEARCH_RESULTS,
        results
    }
}

export const fetchStocks = () => dispatch => (
    StockUtils.fetchStocks()
    .then(stocks =>dispatch(receiveStocks(stocks)))
)

export const fetchStock = ticker_symbol => dispatch => (
    StockUtils.fetchStock(ticker_symbol)
    .then(stock => dispatch(receiveStock(stock)))
)

export const pullStockDetails = ticker_symbol => dispatch => {
//  
    return StockUtils.fetchDailyStockData(ticker_symbol)
    .then(data => dispatch(receiveStockData(data)))
}

export const fetchSearchResults = tags => dispatch => {
    return StockUtils.fetchSearchResults(tags)
    .then(results => dispatch(receiveSearchResults(results)))
}