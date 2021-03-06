export const getWatchlists = () => {
   return $.ajax({
      method: `GET`,
      url: `/api/watchlists`
   })
}

export const getWatchlist = watchlist => {
   
   return $.ajax({
      method: `GET`,
      url: `/api/watchlists/${watchlist}`
   })
}

export const createWatchlist = (ticker_symbol) => {
   ;
   return $.ajax({
      method: `POST`,
      url: `/api/watchlists/`,
      data: ticker_symbol
   })
}

export const deleteWatchlist = (watchlist) => {
   ;
   return $.ajax({
      method: 'DELETE',
      url: `/api/watchlists/${watchlist.id}`
   })
};
