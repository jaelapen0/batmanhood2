import { connect } from "react-redux"
import  HomeWatchlist from "./home_watchlist.jsx"
import { fetchWatchLists } from "../../actions/watchlist_actions";
import { pullStockDetails } from "../../actions/stock_actions"
const mstp = (state) => {
   return {
      state
   }

}

const mdtp = dispatch => {
   return {
      fetchWatchLists: watchlists => dispatch(fetchWatchLists(watchlists)),
      pullStockDetails: ticker_symbol => dispatch(pullStockDetails(ticker_symbol)),
   }
}

export default connect(mstp, mdtp)(HomeWatchlist)