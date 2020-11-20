import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import Portfolio from "./portfolio"

const mstp = ({ session, entities: { users } }) => {

    return { 
        currentUser: users[session.currentId] 
    }

}

const mdtp = dispatch => {

    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user))
    }

}

export default connect(mstp, mdtp)(Portfolio)