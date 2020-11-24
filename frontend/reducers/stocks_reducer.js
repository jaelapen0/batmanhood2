import { RECEIVE_STOCK, RECEIVE_ALL_STOCKS, RECEIVE_STOCK_DATA} from "../actions/stock_actions"

const stocksReducer = (oldState = {}, action) => {
    // debugger
    Object.freeze(oldState);
    switch(action.type){
    case RECEIVE_STOCK:
        return Object.assign({},oldState, {[action.ticker_symbol]: action.stock})
    case RECEIVE_ALL_STOCKS:
        return Object.assign({}, action.stocks)
    case RECEIVE_STOCK_DATA:
        return Object.assign({}, oldState, action.responseJSON)
    default:
        return oldState;
    }
}

export default stocksReducer;