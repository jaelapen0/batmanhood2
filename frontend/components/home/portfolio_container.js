import { connect } from "react-redux"
// import Portfolio from "../portfolio/portfolio";
// import { logout, login } from "../../actions/session_actions"
import {fetchPortfolio} from "../../actions/account_actions"
import Portfolio from "./portfolio"

const mstp = ({entities}, ownProps) => {
    // ;
    return { entities }
}

const mdtp = dispatch => {
    return {
      fetchPortfolio: () => dispatch(fetchPortfolio())
    }
}

export default connect(mstp, mdtp)(Portfolio)
