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
            <div>
                {/* <Greeting/> */}
                <SplashMain/>
                
                <SplashFooter/>
            </div>



        )
    }

}

export default SplashPage;