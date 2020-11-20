import React from "react"
import SplashMain from "./splash_main"
import SplashFooter from "./splash_footer"
import Greeting from "../greeting_container"
class SplashPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="splash-root">
                <SplashMain props={this.props}/>
                
                <SplashFooter/>
            </div>

        )
    }

}

export default SplashPage;