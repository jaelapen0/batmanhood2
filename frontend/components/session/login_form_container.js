import { connect } from "react-redux";
import { login } from '../../actions/session_actions'
import LoginForm from "./login_form"
import React from "react"
import { Link } from "react-router-dom"
const mSTP = (state) => {
    const { errors } = state;
    return {
        errors: errors.session,
        formType: 'login',
        navLink: <Link to="/signup">sign up instead</Link>
    }
}

const mDTP = dispatch => {
    return {
        processForm: (user) => dispatch(login(user))
    }
}

export default connect(mSTP, mDTP)(LoginForm)