// import { connect } from "react-redux"
import SearchBar from "./order_form.jsx"
// import { fetchBuyingPower, setBuyingPower } from "../../actions/account_actions"
import {fetchSearchResults} from "../../actions/stock_actions"

const mstp = (state) => {
    // debugger
    return {
        state
    }

}

const mdtp = dispatch => {
    // ;
    return {
       fetchSearchResults: tags => dispatch(fetchSearchResults(tags))
    }
}

export default connect(mstp, mdtp)(SearchBar)