import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import ClickOutHandler from 'react-onclickout';

const SearchBar = ({ fetchSearchResults }) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [visibleResults, setVisibleResults] = useState(false);

  useEffect(() => {
    if (input.length > 0) {
      setVisibleResults(true);
      fetchSearchResults(input)
        .then(results => {
          setResults(results);
        });
    } else {
      setVisibleResults(false);
    }
  }, [fetchSearchResults, input]);

  const toggleOn = () => {
    setVisibleResults(true);
  };

  const toggleOff = useCallback(() => {
    setVisibleResults(false);
    setResults([]);
  }, []);

  const completeSearch = () => {
    setVisibleResults(false);
    setInput("");
    setResults([]);
  };

  const handleSelect = () => {
    // Handle select
  };

  return (
    <div className="searchbar-container" onFocus={toggleOn}>
      <ClickOutHandler onClickOut={toggleOff}>
        <input
          className="searchbar-input"
          placeholder="Search.."
          type="text"
          onChange={e => setInput(e.target.value)}
          value={input}
        />
        <ul className="search-ul">
          {visibleResults &&
            results.results &&
            Object.keys(results.results).length > 0 &&
            Object.values(results.results).map(result => (
              <div
                id={result.ticker_symbol}
                className="search-result"
                onClick={handleSelect}
              >
                <Link
                  className="searchresult-link"
                  onClick={completeSearch}
                  to={`/stocks/${result.ticker_symbol}`}
                >
                  {result.tags}
                </Link>
              </div>
            ))}
        </ul>
      </ClickOutHandler>
    </div>
  );
};

export default SearchBar;
