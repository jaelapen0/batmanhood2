import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import WatchList from "./watch_list"

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

export default connect(mstp, mdtp)(WatchList)