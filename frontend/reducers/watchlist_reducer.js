import { RECEIVE_ALL_WATCHLISTS, 
         RECEIVE_WATCHLIST, 
         DELETE_WATCHLIST } from "../actions/watchlist_actions";

const watchlistsReducer = (oldState = {}, action) => {
   // 
   Object.freeze(oldState);
   switch (action.type) {
      case RECEIVE_WATCHLIST:
         return Object.assign({}, oldState, { [action.user_id]: action.watchlist })
      case RECEIVE_ALL_WATCHLISTS:
         return Object.assign({}, action.watchlists)
      case DELETE_WATCHLIST:
         let nextState = Object.assign({}, oldState)
         delete nextState[action.watchlist]
         return nextState;
      default:
         return oldState;
   }
}

export default watchlistsReducer;