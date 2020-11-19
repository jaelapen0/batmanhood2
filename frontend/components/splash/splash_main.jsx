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
        // debugger
        // console.log(this.state)
        this.state = {
            email: "demo1234",
            password: "demo1234",
        };
        const user = Object.assign({}, this.state);
        // debugger

        this.props.props.login(user);

    }
    render(){
        return(
            <div id = "splash-main" >
                <div id="splash-main-header">Investing for Everyone</div>

                <div id="splash-paragraph">
                    Batmanhood, a pioneer of commission-free investing, gives you more ways to make your money work harder.
                    </div>
                
                <form onSubmit={this.handleSubmit}>
                    <button id="demo-login" value="Demo Login">Demo Login</button>
                </form>
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