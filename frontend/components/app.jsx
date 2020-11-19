import React from "react";
// import GreetingContainer from "../components/greetings/greeting_container"
import { Switch, Route } from "react-router-dom";
import GreetingContainer from "../components/greeting_container"
import LoginFormContainer from "../components/session/login_form_container"
import SignupFormContainer from "../components/session/signup_form_container"
import SplashMainContainer from "./splash/splash_main_container"
import SplashContainer from "./splash/splash_container"
import { AuthRoute } from "../util/route_util"
const App = () => {
    debugger;
    return(
    <div>
        <div id="splashnav">
                <p id="logo">batmanhood</p>
                <GreetingContainer />
        </div>
       <Switch>
            {/* <AuthRoute path="/" component={SplashMainContainer} /> */}
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <Route path="/" component={SplashContainer}/>
        {/* <Route exact path="/" component={GreetingContainer} /> */}
        </Switch>
    </div>
    )
};

export default App;