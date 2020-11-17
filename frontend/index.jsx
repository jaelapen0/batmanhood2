import React from "react";
import ReactDOM from "react-dom";
import {login, logout, signup} from "./util/session_api_util"
import configureStore from "./store/store"
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore();
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
    
    window.getState = store.getState;
    window.dispatch = store.dispatch; // just for testing!

    // window.login = login;
    // window.logout = logout;
    // window.signup = signup;
});