import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NewsFeed from "./news_feed_container";
import Portfolio from "./portfolio_container";
import { getStockTokens } from "../../util/account_util";
const Home = ({ fetchBuyingPower, setBuyingPower, currentUser }) => {
  const [state, setState] = useState({
    buyingPower: 0,
  });

  const { buyingPower } = state;
  if (!localStorage.daily) {
    getStockTokens().then((res) => {
      localStorage.daily = res[0].token
      localStorage.historic = res[1].token
    });
  }

  useEffect(() => {
    fetchBuyingPower(currentUser.id).then((buyingPower) => {
      setState((prevState) => ({ ...prevState, buyingPower: buyingPower.buying_power.buying_power }));
    });
  }, [currentUser.id, fetchBuyingPower]);

  const addMoney = (e) => {
    let amount = parseFloat(e.currentTarget.id);
    let oldTotal = parseFloat(buyingPower);
    let newTotal = amount + oldTotal;
    let id = currentUser.id;

    setBuyingPower(currentUser.id, newTotal).then(() => {
      fetchBuyingPower(id).then((buyingPower) => {
        setState((prevState) => ({ ...prevState, buyingPower: buyingPower.buying_power.buying_power }));
      });
    });
  };

  return (
    <div className="home-container">
      { buyingPower ? (
        <div>
          <Portfolio props={[fetchBuyingPower, setBuyingPower, currentUser]} buyingPower={buyingPower} />
                  {/* props={fetchBuyingPower, setBuyingPower, currentUser} */}
        </div>
      ) : ("") }

      <div className="add-money-container">
        <h3>Add Money</h3>
        <h5>Cash Balance: ${parseFloat(parseFloat(buyingPower).toFixed(2)).toLocaleString()}</h5>
        <div className="amount">
          <button id="100" onClick={addMoney} className="header-button">$100</button>
          <button id="500" onClick={addMoney} className="header-button">$500</button>
          <button id="1000" onClick={addMoney} className="header-button">$1000</button>
          <button id="10000" onClick={addMoney} className="header-button">$10,000</button>
          <button id="100000" onClick={addMoney} className="header-button">$100,000</button>
        </div>
      </div>
      <NewsFeed />
    </div>
  );
};

export default Home;
