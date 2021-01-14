import * as WatchlistUtils from "../util/watchlist_util";

export const RECEIVE_WATCHLIST = "RECEIVE_WATCHLIST";
export const RECEIVE_ALL_WATCHLISTS = "RECEIVE_ALL_WATCHLISTS";
export const DELETE_WATCHLIST = "DELETE_WATCHLIST";
const receiveWatchlist = watchlist => {
   return {
      type: RECEIVE_WATCHLIST,
      watchlist
   }
}

const receiveWatchlists = watchlists => {
   return {
      type: RECEIVE_ALL_WATCHLISTS,
      watchlists
   }
}

const removeWatchlist = () => {
   return {
      type: DELETE_WATCHLIST,
   }
}

export const fetchWatchLists = () => dispatch => {
   return WatchlistUtils.getWatchlists()
          .then(watchlists => dispatch(receiveWatchlists(watchlists)))
}

export const fetchWatchList = watchlist => dispatch => {
   return WatchlistUtils.getWatchlist(watchlist)
      .then(watchlist => dispatch(receiveWatchlist(watchlist)))
}

export const createWatchlist = watchlist => dispatch => {
   return WatchlistUtils.createWatchlist(watchlist)
      .then(watchlist => dispatch(receiveWatchlist(watchlist)))
}

export const deleteWatchlist = watchlist => dispatch => {
   return WatchlistUtils.deleteWatchlist(watchlist)
      .then(() => dispatch(removeWatchlist()))
}



