import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import stocksReducer from './stocks_reducer';
import accountReducer from './account_reducer';
import watchlistsReducer from './watchlist_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    account: accountReducer,
    watchlists: watchlistsReducer
});

export default entitiesReducer;