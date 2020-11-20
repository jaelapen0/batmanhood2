import * as StockActions from "../util/stock_util"

export const RECEIVE_STOCK = "RECEIVE_STOCK"
export const RECEIVE_ALL_STOCKS = "RECEIVE_ALL_STOCKS"

const receiveStock = stock => {
    return {
        type: RECEIVE_STOCK,
        stock
    }
}

const receiveStocks = stocks => {
    return {
        type: RECEIVE_ALL_STOCKS,
        stocks
    }
}

export const fetchStocks = () => dispatch => (
    StockActions.fetchStocks()
    .then(stocks =>dispatch(receiveStocks(stocks)))
)

export const fetchStock = stockId => dispatch => (
    StockActions.fetchStock(stockId)
    .then(stock => dispatch(receiveStock(stock)))
)