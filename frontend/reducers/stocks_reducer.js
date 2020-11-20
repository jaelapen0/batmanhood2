import { RECEIVE_STOCK, RECEIVE_ALL_STOCKS} from "../actions/stock_actions"

const stocksReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch(action.type){
    case RECEIVE_STOCK:
        return Object.assign({},oldState, {[action.stock.id]: action.stock})
    case RECEIVE_ALL_STOCKS:
        return Object.assign({}, action.stocks)
    default:
        return oldState;
    }
}

export default stocksReducer;