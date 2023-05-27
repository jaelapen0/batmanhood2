import { connect } from "react-redux"
import  DarkModeProvider from "./dark_mode"
import { fetchDarkMode } from "../../actions/account_actions";
import { setDarkMode } from "../../actions/account_actions";
const mstp = ({ dark_mode }) => {
   return { dark_mode }
}

const mdtp = dispatch => {
   return {
      fetchDarkMode: dark_mode => dispatch(fetchDarkMode(dark_mode)),
      setDarkMode: dark_mode => dispatch(setDarkMode(dark_mode))
   }
}

export default connect(mstp, mdtp)(DarkModeProvider)