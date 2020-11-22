import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import CompanyProfile from "./company_profile.jsx"
import { fetchStock, pullStockDetails } from "../../actions/stock_actions"

const mstp = (state) => {
    debugger;
    return {
       state
    }

}

const mdtp = dispatch => {
    // debugger;
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user)),
        fetchStock: stock => dispatch(fetchStock(stock)),
        pullStockDetails: stock => dispatch(pullStockDetails(stock))
    }
}

export default connect(mstp, mdtp)(CompanyProfile)