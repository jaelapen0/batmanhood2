import React from "react";
import ReactDOM from "react-dom";
import {login, logout, signup} from "./util/session_api_util"
// import {createOrder} from "./util/account_util"
import { fetchStock, fetchStocks, fetchDailyStockData, fetchCompanyProfile , fetchNews} from "./util/stock_util"
import {pullStockDetails} from "./actions/stock_actions"
import configureStore from "./store/store"
import Root from "./components/root";
import {getPortfolio, getOrderHistory, createOrder, getBuyingPower, updateBuyingPower} from "./util/account_util"
document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentId: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store} />, root);
    // window.dispatch = store.dispatch;
    // window.getState = store.dispatch;
    window.fetchStock =fetchStock;
    window.fetchStocks = fetchStocks;
    window.fetchDailyStockData = fetchDailyStockData;
    window.pullStockDetails = pullStockDetails;
    window.fetchCompanyProfile = fetchCompanyProfile;
    window.fetchNews= fetchNews;
    window.getOrderHistory = getOrderHistory;
    window.getPortfolio = getPortfolio;
    window.createOrder = createOrder;
    window.getBuyingPower = getBuyingPower;
    window.updateBuyingPower = updateBuyingPower;
});