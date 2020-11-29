import React from "react"

class SplashMain extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "jeffrey",
            password: "jeffrey",
        };
       this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        this.state = {
            email: "jeffrey",
            password: "jeffrey",
        };
        const user = Object.assign({}, this.state);
        this.props.props.login(user);

    }
    render(){
        return(
            <div className="splash-root">
            <div id = "splash-main" >
                <div className="splash-top">
                    <div id="splash-main-header">
                            <h3 className="splash-h3">Investing for Everyone</h3>
                        <div id="splash-paragraph">
                                Batmanhood, a pioneer of commission-free investing, gives you more ways to make your money work harder.
                        <form className="demo-form" onSubmit={this.handleSubmit}>
                            <button id="demo-login" value="Demo Login">Demo Login</button>
                        </form> 
                    </div>
                    
                    </div>
                    <video className="vid" width="600" autoPlay muted loop playsInline>
                        <source src={window.splash_vid} type="video/mp4" />
                    </video>
                </div>

               
             
            </div>

                <div id="splash-footer">
                    <div id="footer-name">
                        by Jae Song November 2020

                    </div>
                    <div id="foot-paragraph">
                        Keep your portfolio at your fingertips. Everything you need to manage your assets is available in a single site.
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