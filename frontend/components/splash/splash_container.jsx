import { connect } from "react-redux"
import { logout, login } from "../../actions/session_actions"
import SplashPage from "./splash_page.jsx"
const mstp = ({ session, entities: { users } }) => {
    if (users[session.id]) {
        return { currentUser: users[session.id] }
    }
    else {
        return { currentUser: users[session.currentId] }
    }
}

const mdtp = dispatch => {
    return {
        logout: () => dispatch(logout()),
        login: (user) => dispatch(login(user))
    }
}

export default connect(mstp, mdtp)(SplashPage)