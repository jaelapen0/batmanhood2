import React from "react"


class OrderForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
            buying_power: "",
            price_per_share: this.props.currentPrice,
            user_id: this.props.currentUser,
            shares_quantity: 0,
            is_completed: true,
            ticker_symbol: this.props.ticker.toUpperCase(),
            order_type: "buy",
            errors: ""
        

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // debugger;
        this.props.fetchBuyingPower(this.props.currentUser)
            .then(info => {
                this.setState({buying_power: info.buying_power.buying_power})
                // debugger;
            })
        // debugger;
    }

    componentDidUpdate(){

    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        // debugger;
          // this.setState({shares_quantity: parseInt(this.state.shares_quantity)})
       if (this.state.order_type === "buy"){
           debugger
           const totalAmount = this.props.currentPrice * this.state.shares_quantity;
            if (totalAmount > this.state.buying_power){
                debugger
                this.state.errors = "Not enough Buying Power"
            }
            else if( this.state.shares_quantity === 0) {
                debugger
                this.state.errors = "Must be at least 1 share"}
            else{
                debugger
                const newTotal = this.state.buying_power - totalAmount
                this.props.setBuyingPower(this.state.user_id, { buying_power: newTotal})
                this.props.createOrder(this.state)
                this.setState({ buying_power: newTotal })
                this.state.errors = "congrats on the purchase"
                

                // .then(
                    // window.alert("congrats on the purchase")
            }
       }
    //    this.render()
        // debugger
    }


    render(){
            debugger;
            
        return(
            <div>
                <div className="order-container">
                    <form onSubmit={this.handleSubmit}>
                        <h4>BUY {this.props.ticker.toUpperCase()}</h4>
                        <div>
                            <p>Shares</p>
                            <input type="number" 
                            min="0"
                            name="shares_quantity" 
                            value={this.state.shares_quantity} 
                            onChange={this.update("shares_quantity")}/>
                        </div>

                        <div>
                            <p>Market Price:</p>
                            <p className="bold"> ${this.props.currentPrice.toFixed(2)}</p>
                        </div>

                        <div className="estimated-cost"> 
                        <p className="bold">Estimated Cost:</p> 
                        <p>${(this.props.currentPrice * this.state.shares_quantity).toFixed(2)} </p>
                        </div>
                        <button className="order-button">BUY</button>
                        {this.state ? (
                            <div>
                                <p>Buying Power: ${parseFloat(this.state.buying_power).toFixed(2)}</p>
                            </div>
                        ) : ""}
                        {this.state.errors? <p> {this.state.errors}</p> : ""}
                    </form>
                </div>
            </div>
        )
    }



}

export default OrderForm;