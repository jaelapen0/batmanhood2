import { RECEIVE_PORTFOLIO, RECEIVE_ORDER_HISTORY, RECEIVE_ORDER, RECEIVE_BUYING_POWER} from "../actions/account_actions"

const accountReducer = (oldState ={}, action) => {
    Object.freeze(oldState)
    // debugger;
    switch(action.type){
        case RECEIVE_ORDER_HISTORY:
            return Object.assign({}, oldState, { orderHistory: action.orderHistory})
        case RECEIVE_PORTFOLIO:
            return Object.assign({}, oldState, { portfolio: action.portfolio })
        case RECEIVE_ORDER:
            return Object.assign({}, oldState, {[action.order.id]: action.order})
        case RECEIVE_BUYING_POWER:
            return Object.assign({}, oldState, {buying_power: action.buying_power})
        default:
            return oldState;
    }
}

export default accountReducer;