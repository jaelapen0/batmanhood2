import {connect} from "react-redux"
import { logout, login } from '../actions/session_actions';
import Greeting from './greeting';

const mstp = ({session, entities: {users} }) => {

    if (users[session.id]){
        return{currentUser: users[session.id] }
    }
    else {
        return{ currentUser: users[session.currentId]}
    }
}


const mdtp = dispatch => ({
    logout: () => dispatch(logout()),
    login: (user) => dispatch(login())
});

export default connect(mstp,mdtp)(Greeting)