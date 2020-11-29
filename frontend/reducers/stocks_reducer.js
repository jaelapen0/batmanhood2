import { RECEIVE_STOCK, RECEIVE_ALL_STOCKS, RECEIVE_STOCK_DATA, RECEIVE_SEARCH_RESULTS} from "../actions/stock_actions"

const stocksReducer = (oldState = {}, action) => {
    // 
    Object.freeze(oldState);
    switch(action.type){
    case RECEIVE_STOCK:
        return Object.assign({},oldState, {[action.ticker_symbol]: action.stock})
    case RECEIVE_ALL_STOCKS:
        return Object.assign({}, action.stocks)
    case RECEIVE_STOCK_DATA:
        return Object.assign({}, oldState, action.responseJSON)
    case RECEIVE_SEARCH_RESULTS:
        return Object.assign({}, oldState, action.stocks)
    default:
        return oldState;
    }
}

export default stocksReducer;