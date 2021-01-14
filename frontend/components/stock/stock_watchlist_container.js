import { connect } from "react-redux"
import StockWatchlist from "./stock_watchlist.jsx"
import { fetchWatchList, createWatchlist, deleteWatchlist } from "../../actions/watchlist_actions"
const mstp = (state) => {
   return {
      state
   }

}

const mdtp = dispatch => {
   return {

      fetchWatchList: watchlist => dispatch(fetchWatchList(watchlist)),
      createWatchlist: watchlist => dispatch(createWatchlist(watchlist)),
      deleteWatchlist: watchlist => dispatch(deleteWatchlist(watchlist)),
   }
}

export default connect(mstp, mdtp)(StockWatchlist)