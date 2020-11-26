import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import StockNews from "./stock_news"
import { fetchStock, pullStockDetails } from "../../actions/stock_actions"

const mstp = (state) => {
    // ;
    return {
        state
    }

}

const mdtp = dispatch => {
    // ;
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user)),
        fetchStock: stock => dispatch(fetchStock(stock)),
        pullStockDetails: stock => dispatch(pullStockDetails(stock))
    }
}

export default connect(mstp, mdtp)(StockNews)