import React from "react";
import ReactDOM from "react-dom";
import {login, logout, signup} from "./util/session_api_util"
import configureStore from "./store/store"
const store = configureStore();
document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<h1>Welcome Gang</h1>, root);
    // debugger;
    // window.getState = store.getState;
    // debugger
    // window.dispatch = store.dispatch; // just for testing!
    // window.login = login;
    // window.logout = logout;
    // window.signup = signup;
});