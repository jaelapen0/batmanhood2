import React from "react";
// import GreetingContainer from "../components/greetings/greeting_container"
import { Switch, Route } from "react-router-dom";
import GreetingContainer from "../components/greeting_container"
import LoginFormContainer from "../components/session/login_form_container"
import SignupFormContainer from "../components/session/signup_form_container"
import { AuthRoute } from "../util/route_util"
const App = () => (
    <div>
        <h1>batmanhood</h1>
        <GreetingContainer />
        <AuthRoute path="/login" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
    </div>
);

export default App;