import { connect } from "react-redux"
import {logout, login} from "../../actions/session_actions"
import SplashMain from "./splash_main.jsx"
const mstp = (state,{ session, entities: { users } }) => {
    if (users[session.id]) {
        return { currentUser: users[session.id] }
    }
    else {
        return { currentUser: users[session.currentId] }
    }
}

const mdtp = dispatch => {
    return  { 
        login: (user) => dispatch(login(user)),
        processForm: (user) => dispatch(login(user))
    }
}

export default connect(mstp, mdtp)(SplashMain)