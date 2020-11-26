import React from "react"
// import { debug } from "webpack"

class OrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            buying_power: "",
            currentPrice: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        debugger;
        this.props.fetchBuyingPower(this.props.currentUser)
            .then(info => {
                this.setState({buying_power: info.buying_power.buying_power})
                debugger;
            })
        debugger;
    }

    componentDidUpdate(){

    }

    handleSubmit(e) {
        e.preventDefault()
        debugger;
    }


    render(){

            debugger;
        return(
            <div>
                <div className="order-container">
                    <form onSubmit={this.handleSubmit}>
                        <h4>BUY {this.props.ticker.toUpperCase()}</h4>
                        <label>Shares
                                    <input type="text" name="shares_quantity" />
                        </label>
                        <br />
                        <label>Market Price
                                    : ${this.props.currentPrice.toFixed(2)} per Share
                        </label>
                        {this.state ? (
                            <p>Buying Power: ${parseFloat(this.state.buying_power).toFixed(2)}</p>
                        ) : ""}
                        <button id="form-button">BUY</button>
                    </form>
                </div>
            </div>
        )
    }



}

export default OrderForm;