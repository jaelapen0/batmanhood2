import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import StockPage from "./stock_page.jsx"
const mstp = ({ session, entities: { users } }) => {
    
    return { currentUser: users[session.currentId] }
   
}

const mdtp = dispatch => {
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user))
    }
}

export default connect(mstp, mdtp)(StockPage)