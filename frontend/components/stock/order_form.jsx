import React from "react"
import StockWatchlist from "./stock_watchlist_container"

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
            errors: "",
            sharesOwned: 0,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        let {fetchOrderHistory, fetchBuyingPower} = this.props;
        let currentUser = this.props.currentUser;

        Promise.all([fetchOrderHistory(), fetchBuyingPower(currentUser)])
        .then(([orders, buying_power]) => {
            // ;
            let sharesOwned = 0
            let orderHistory = orders.orderHistory 
            // 
            for (let i = 0; i < orderHistory.length; i++) {
                // 
                if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "buy") {
                    sharesOwned += orderHistory[i].shares_quantity;
                }
                else if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "sell") {
                    sharesOwned -= orderHistory[i].shares_quantity;
                }
            }
            this.setState({ 
                buying_power: buying_power.buying_power.buying_power, 
                orderHistory: orders.orderHistory,
                sharesOwned
             })
        })
      
    }

    componentDidUpdate(prevProps, prevState){
       ;
        if (this.props.state.entities.account.buying_power !== prevProps.state.entities.account.buying_power){
           
            this.setState({ buying_power: this.props.state.entities.account.buying_power.buying_power})
            this.props.fetchOrderHistory()
            .then(orders => {
                let sharesOwned = 0
                let orderHistory = orders.orderHistory

                for (let i = 0; i < orderHistory.length; i++) {
                    //  
                    if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "buy") {
                        sharesOwned += orderHistory[i].shares_quantity;
                    }
                    else if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "sell") {
                        sharesOwned -= orderHistory[i].shares_quantity;
                    }
                }
                ;
                this.setState({
                    sharesOwned,
                })
            })
                .then(this.props.fetchOrderHistory()
                    .then(orders => {
                        let sharesOwned = 0
                        let orderHistory = orders.orderHistory

                        for (let i = 0; i < orderHistory.length; i++) {
                            //  
                            if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "buy") {
                                sharesOwned += orderHistory[i].shares_quantity;
                            }
                            else if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "sell") {
                                sharesOwned -= orderHistory[i].shares_quantity;
                            }
                        }
                        ;
                        this.setState({
                            sharesOwned,
                        }, this.render)
                    }))
        }

        if (this.props.ticker !== prevProps.ticker){
            let { fetchOrderHistory, fetchBuyingPower } = this.props;
            let currentUser = this.props.currentUser;

            Promise.all([fetchOrderHistory(), fetchBuyingPower(currentUser)])
                .then(([orders, buying_power]) => {
                    // ;
                    let sharesOwned = 0
                    let orderHistory = orders.orderHistory
                    // 
                    for (let i = 0; i < orderHistory.length; i++) {
                        // 
                        if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "buy") {
                            sharesOwned += orderHistory[i].shares_quantity;
                        }
                        else if (orderHistory[i].ticker_symbol === this.props.ticker && orderHistory[i].order_type === "sell") {
                            sharesOwned -= orderHistory[i].shares_quantity;
                        }
                    }
                    this.setState({
                        buying_power: buying_power.buying_power.buying_power,
                        orderHistory: orders.orderHistory,
                        sharesOwned,
                        price_per_share: this.props.currentPrice,
                        user_id: this.props.currentUser,
                        shares_quantity: 0,
                        is_completed: true,
                        ticker_symbol: this.props.ticker.toUpperCase(),
                        order_type: "buy",
                        errors: "",
                    })
                })
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
            if (totalAmount > this.state.buying_power){
                this.setState({errors: "Not enough Buying Power"})
            }
            else if( this.state.shares_quantity === 0) {
                this.setState({errors: "Must be at least 1 share" })
            }
            else{
                const newTotal = parseFloat(this.state.buying_power) - totalAmount
                let props = this.props;
                let state = this.state;
 
                let { fetchOrderHistory, fetchBuyingPower, setBuyingPower, createOrder } = this.props;
                let currentUser = this.props.currentUser;

                Promise.all([createOrder(state), setBuyingPower(state.user_id, { buying_power: newTotal })])
                    .then(([createdOrder, settedBuyingPower]) => {
                        ;
                        this.setState({
                            errors: "Your shares have been purchased",
                            shares_quantity: 0 
                        })
                    })
                    .then(fetchBuyingPower(currentUser).then(buying_power => {
                        this.setState({
                            buying_power: buying_power.buying_power.buying_power
                        }, this.render)
                    }))
            }
       } else if (this.state.order_type === "sell"){

            if (this.state.shares_quantity === 0) {
                this.setState({ errors: "Must be at least 1 share", shares_quantity: 0 })
            }
            else if (this.state.sharesOwned < this.state.shares_quantity){
                this.setState({ errors: `You have less than ${this.state.shares_quantity} shares` })
            }
            else{
                const newTotal = parseFloat(this.state.buying_power) + totalAmount
                let state = this.state;

                let { fetchOrderHistory, fetchBuyingPower, setBuyingPower, createOrder } = this.props;
                let currentUser = this.props.currentUser;
                Promise.all([createOrder(state), setBuyingPower(state.user_id, { buying_power: newTotal })])
                    .then(([createdOrder, settedBuyingPower]) => {
                        ;
                        this.setState({
                            errors: "Your shares have been sold",
                            shares_quantity: 0
                        })

                    })
                    
                    .then(fetchBuyingPower(currentUser).then(buying_power => {
                        this.setState({
                            buying_power: buying_power.buying_power.buying_power})
                    }))
            }
       }
    }

    changeOrderType(field){
       return e =>  this.setState({order_type: field})
    }
    render(){
            
            let {order_type, buying_power, shares_quantity, sharesOwned} = this.state;
            
            
        return(
            <div>
                <div className="order-container">
                    <form onSubmit={this.handleSubmit}>
                       <div>
                            <h4 className={order_type === "buy" ?
                                "selected" : "non-selected"}
                                style={{ color: this.props.color }}
                                
                                onClick={this.changeOrderType("buy")}
                                >BUY {this.props.ticker.toUpperCase()}</h4>
                            <h4 className={order_type === "sell" ?
                                "selected" : "non-selected"} 
                                style={{ color: this.props.color }}
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
                        <button className="order-button" 
                        style={{ backgroundColor: this.props.color }}
                        // style={this.props.color === "red" ? { "background-color": "red", "background-color": "#25a17b"} : {} }
                        >{order_type.toUpperCase()}</button>
                        {this.state ? (
                           
                                <p className="bpow">Buying Power: ${parseFloat(buying_power).toFixed(2)}</p>
                           
                        ) : ""}
                        {this.state.errors !== "" ? <p className="bpow" style={{ color: this.props.color }}> {this.state.errors}</p> : ""}
                        {<p className="bpow">Shares Owned: {sharesOwned}</p>}
                        
                    </form>
                    <StockWatchlist
                        ticker_symbol={this.props.ticker}
                        color={this.props.color}
                        props={this.props}
                    />
                </div>
         
            </div>
        )
    }

}

export default OrderForm;