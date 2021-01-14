import { connect } from "react-redux"
import OrderForm from "./order_form.jsx"
import { fetchBuyingPower, setBuyingPower, fetchOrderHistory, createOrder} from "../../actions/account_actions"
import {fetchWatchList, createWatchlist, deleteWatchlist} from "../../actions/watchlist_actions"
const mstp = (state) => {
    return {
        state
    }

}

const mdtp = dispatch => {
    return {
        createOrder: order => dispatch(createOrder(order)),
        fetchBuyingPower: currentId => dispatch(fetchBuyingPower(currentId)),
        setBuyingPower: (currentId, buying_power) => dispatch(setBuyingPower(currentId, buying_power)),
        fetchOrderHistory: () => dispatch(fetchOrderHistory()),
        fetchWatchList: watchlist => dispatch(fetchWatchList(watchlist)),
        createWatchlist: watchlist => dispatch(createWatchlist(watchlist)),
        deleteWatchlist: watchlist => dispatch(deleteWatchlist(watchlist)),
    }
}

export default connect(mstp, mdtp)(OrderForm)