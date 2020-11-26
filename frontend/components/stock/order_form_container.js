import { connect } from "react-redux"
import OrderForm from "./order_form.jsx"
import { fetchBuyingPower, setBuyingPower } from "../../actions/account_actions"

const mstp = (state) => {
    // debugger;
    return {
        state
    }

}

const mdtp = dispatch => {
    // debugger;
    return {
        createOrder: order => dispatch(createOrder(order)),
        fetchBuyingPower: currentId => dispatch(fetchBuyingPower(currentId)),
        setBuyingPower: (currentId, buying_power) => dispatch(setBuyingPower(currentId, buying_power))
    }
}

export default connect(mstp, mdtp)(OrderForm)