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
        // ;
        this.props.fetchBuyingPower(this.props.currentUser)
            .then(info => {
                debugger;
                this.setState({buying_power: info.buying_power.buying_power})
                // ;
            })
        // ;
    }

    componentDidUpdate(prevProps){
       debugger;
        if (this.props.state.entities.account.buying_power !== prevProps.state.entities.account.buying_power){
           
            this.setState({ buying_power: this.props.state.entities.account.buying_power.buying_power})
           
        }
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()

       const totalAmount = this.props.currentPrice * this.state.shares_quantity;
       if (this.state.order_type === "buy"){
        //    
            if (totalAmount > this.state.buying_power){
                this.state.errors = "Not enough Buying Power"
            }
            else if( this.state.shares_quantity === 0) {
                this.state.errors = "Must be at least 1 share"}
            else{
                const newTotal = parseFloat(this.state.buying_power) - totalAmount
                this.props.setBuyingPower(this.state.user_id, { buying_power: newTotal})
                this.props.createOrder(this.state)
                this.setState({ buying_power: newTotal })
                this.state.errors = "Your shares have been purchased"
            }
       } else if (this.state.order_type === "sell"){
           debugger;
           const newTotal = parseFloat(this.state.buying_power) + totalAmount
           this.props.setBuyingPower(this.state.user_id, { buying_power: newTotal })
           this.props.createOrder(this.state)
           debugger;
           this.setState({ buying_power: newTotal })
           debugger;
           this.state.errors = "Your shares have been sold"
       }
    }

    changeOrderType(field){
       return e =>  this.setState({order_type: field})
    }
    render(){
            // ;
            const {order_type, buying_power, shares_quantity} = this.state;
            debugger;
        return(
            <div>
                <div className="order-container">
                    <form onSubmit={this.handleSubmit}>
                       <div>
                            <h4 className={order_type === "buy" ?
                                "selected" : "non-selected"}
                                onClick={this.changeOrderType("buy")}
                                >BUY {this.props.ticker.toUpperCase()}</h4>
                            <h4 className={order_type === "sell" ?
                                "selected" : "non-selected"} 
                                onClick={this.changeOrderType("sell")}
                            >SELL {this.props.ticker.toUpperCase()}</h4>
                        </div>
                        <div>
                            <p>Shares</p>
                            <input type="number" 
                            min="0"
                            name="shares_quantity" 
                            value={shares_quantity} 
                            onChange={this.update("shares_quantity")}/>
                        </div>

                        <div>
                            <p>Market Price:</p>
                            <p className="bold"> ${this.props.currentPrice.toFixed(2)}</p>
                        </div>

                        <div className="estimated-cost"> 
                        <p className="bold">Estimated Cost:</p> 
                        <p>${(this.props.currentPrice * shares_quantity).toFixed(2)} </p>
                        </div>
                        <button className="order-button">{order_type.toUpperCase()}</button>
                        {this.state ? (
                            <div>
                                <p className="bpow">Buying Power: ${parseFloat(buying_power).toFixed(2)}</p>
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