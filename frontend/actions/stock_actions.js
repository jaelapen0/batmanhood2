import * as StockUtils from "../util/stock_util"

export const RECEIVE_STOCK = "RECEIVE_STOCK"
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS"
export const RECEIVE_STOCK_DATA = "RECEIVE_STOCK_DATA"
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
    // debugger;
    return {
        type: RECEIVE_STOCK_DATA,
        data
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
//  debugger
    return   StockUtils.fetchDailyStockData(ticker_symbol)
    .then(data => dispatch(receiveStockData(data)))
}