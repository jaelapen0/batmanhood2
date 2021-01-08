import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import {fetchBuyingPower, setBuyingPower} from "../../actions/account_actions"
import Home from "./home"
const mstp = ({ session, entities: { users } }) => {
    
    return { currentUser: users[session.currentId] }
}

const mdtp = dispatch => {
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user)),
        fetchBuyingPower: currentId => dispatch(fetchBuyingPower(currentId)),
        setBuyingPower: (currentId, buying_power) => dispatch(setBuyingPower(currentId, buying_power)),
    }
}

export default connect(mstp, mdtp)(Home)
