import * as AccountUtils from "../util/account_util"

export const RECEIVE_ORDER_HISTORY = "RECEIVE_ORDER_HISTORY"
export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO"
export const RECEIVE_ORDER = "RECEIVE_ORDER"
export const RECEIVE_BUYING_POWER = "RECEIVE_BUYING_POWER"

const receiveOrderHistory = orderHistory => {
    return {
        type: RECEIVE_ORDER_HISTORY,
        orderHistory
    }
}

const receivePortfolio = portfolio => {
    return {
        type: RECEIVE_PORTFOLIO,
        portfolio
    }
}

const receiveOrder = order => {
    ;
   return { 
       type: RECEIVE_ORDER,
       order
    }
}
const receiveBuyingPower = buying_power => {
    return {
        type: RECEIVE_BUYING_POWER,
        buying_power
    }
}


export const fetchOrderHistory = () => dispatch => {

    return AccountUtils.getOrderHistory()
        .then(orderHistory => dispatch(receiveOrderHistory(orderHistory)))
}

export const fetchPortfolio = () => dispatch => { 
    // ;
    return AccountUtils.getPortfolio()
      .then(portfolio => dispatch(receivePortfolio(portfolio)))
}

export const createOrder = order => dispatch => {
    debugger
    return AccountUtils.createOrder(order)
        .then(order => dispatch(receiveOrder(order)))
}

export const fetchBuyingPower = currentId => dispatch => {
    return AccountUtils.getBuyingPower(currentId)
    .then(buying_power => dispatch(receiveBuyingPower(buying_power)))
}

export const setBuyingPower = (currentId, buying_power) => dispatch => {
    return AccountUtils.updateBuyingPower(currentId, buying_power)
        .then(buying_power => dispatch(receiveBuyingPower(buying_power)))
}