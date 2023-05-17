import React from "react";
import ReactDOM from "react-dom";
import {login, logout, signup} from "./util/session_api_util"
import configureStore from "./store/store"
import Root from "./components/root";
import {getWatchlist, createWatchlist, getWatchlists, deleteWatchlist} from './util/watchlist_util'
import {fetchHistoricStockData} from './util/stock_util';

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
});