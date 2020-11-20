import React from "react";
import { Switch, Route } from "react-router-dom";
import GreetingContainer from "../components/greeting_container"
import LoginFormContainer from "../components/session/login_form_container"
import SignupFormContainer from "../components/session/signup_form_container"
import SplashMainContainer from "./splash/splash_main_container"
import SplashContainer from "./splash/splash_container"
import { AuthRoute, ProtectedRoute } from "../util/route_util"
import MainContainer from "./main/main_container"
import StockPageContainer from "../components/stock/stock_page_container"
const App = () => {
    return(
    <div>
        <div id="splashnav">
                <a id="logo" href="/">Batmanhood</a>
                <GreetingContainer />
        </div>
       <Switch>
            {/* <AuthRoute path="/" component={SplashMainContainer} /> */}
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        {/* <Route path="/" component={SplashContainer}/> */}
        {/* <ProtectedRoute path="/stocks/:stockId" component={StockPageContainer} /> */}
        <Route path="/" component={MainContainer} />
        {/* <Route exact path="/" component={GreetingContainer} /> */}
        </Switch>
    </div>
    )
};

export default App;