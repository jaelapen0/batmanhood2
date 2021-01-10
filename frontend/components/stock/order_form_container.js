import { connect } from "react-redux"
import OrderForm from "./order_form.jsx"
import { fetchBuyingPower, setBuyingPower, fetchOrderHistory, createOrder} from "../../actions/account_actions"

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
    }
}

export default connect(mstp, mdtp)(OrderForm)