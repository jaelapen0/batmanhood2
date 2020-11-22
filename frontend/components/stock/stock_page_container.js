import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import StockPage from "./stock_page.jsx"
import {fetchStock, pullStockDetails} from "../../actions/stock_actions"

const mstp = ({ session, entities: { users } }, state) => {
    // debugger;
    // let ticker = this.props.location.pathname.split("/")[2]
    return { 
        currentUser: users[session.currentId], 
        stock: state
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

export default connect(mstp, mdtp)(StockPage)