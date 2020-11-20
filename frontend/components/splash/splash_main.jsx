import React from "react"

class SplashMain extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "demo1234",
            password: "demo1234",
        };
       this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.state = {
            email: "demo1234",
            password: "demo1234",
        };
        const user = Object.assign({}, this.state);
        this.props.props.login(user);

    }
    render(){
        return(
            <div className="splash-root">
            <div id = "splash-main" >
                <div id="splash-main-header">Investing for Everyone</div>

                <div id="splash-paragraph">
                    Batmanhood, a pioneer of commission-free investing, gives you more ways to make your money work harder.
                    </div>
                
                <form onSubmit={this.handleSubmit}>
                    <button id="demo-login" value="Demo Login">Demo Login</button>
                </form>
            </div>
                <div id="splash-footer">
                    <div id="footer-name">
                        by Jae Song November 2020

                    </div>
                    <div id="foot-paragraph">
                        Keep your portfolio in your pocket. Everything you need to manage your assets is available in a single site.
                    </div>
                </div>
            </div>

        )
    }
}

// const SplashMain = () => {
//     return (
//         <div id="splash-main">
//             <div id="splash-main-header">Investing for Everyone</div>

//             <div id="splash-paragraph">
//                 Batmanhood, a pioneer of commission-free investing, gives you more ways to make your money work harder.
//                 </div>
//             <button id="demo-login" value="Demo Login">Demo Login</button>
//         </div>

//     )
// }

export default SplashMain;