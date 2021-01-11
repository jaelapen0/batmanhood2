import { connect } from "react-redux"
// import Portfolio from "../portfolio/portfolio";
// import { logout, login } from "../../actions/session_actions"
import {fetchPortfolio, fetchBuyingPower, fetchOrderHistory} from "../../actions/account_actions"
import {pullStockDetails} from "../../actions/stock_actions"
import Portfolio from "./portfolio"

const mstp = ({entities}, ownProps) => {
    // ;
    return { entities }
}

const mdtp = dispatch => {
    return {
      fetchPortfolio: () => dispatch(fetchPortfolio()),
      pullStockDetails: ticker_symbol => dispatch(pullStockDetails(ticker_symbol)),
      fetchBuyingPower: currentId => dispatch(fetchBuyingPower(currentId)),
      fetchOrderHistory: () => dispatch(fetchOrderHistory()),
    }
}

export default connect(mstp, mdtp)(Portfolio)
