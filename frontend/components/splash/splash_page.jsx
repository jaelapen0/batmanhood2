import React from "react"
import SplashMain from "./splash_main"
import SplashFooter from "./splash_footer"

class SplashPage extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <SplashMain/>
                
                <SplashFooter/>
            </div>



        )
    }

}

export default SplashPage;