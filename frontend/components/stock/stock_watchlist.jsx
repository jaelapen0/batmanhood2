import React, { useEffect, useState } from "react";

const StockWatchlist = ({ ticker_symbol, fetchWatchList, createWatchlist, deleteWatchlist, color }) => {
   const [result, setResult] = useState(null);

   useEffect(() => {
      fetchWatchList(ticker_symbol).then((res) => {
         setResult(res);
      });
   }, [ticker_symbol]);

   const handleWatchList = (e) => {
      if (e.target.innerText.includes("Add")) {
         createWatchlist({ ticker_symbol }).then((res) => {
            const watchlist = { watchlist: [res] };
            setResult(watchlist);
         });
      } else {
         deleteWatchlist({ id: ticker_symbol }).then((res) => {
            setResult({ watchlist: [] });
         });
      }
   };

   return (
      <div style={{ borderTop: "1px solid lightgray" }}>
         {result && result.watchlist.length > 0 ? (
            <button
               className="order-button"
               onClick={handleWatchList}
               style={{ backgroundColor: color }}
            >
               Remove from List
            </button>
         ) : (
            <button
               className="order-button"
               onClick={handleWatchList}
               style={{ backgroundColor: color }}
            >
               Add to List
            </button>
         )}
      </div>
   );
};

export default StockWatchlist;