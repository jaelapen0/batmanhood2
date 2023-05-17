import React, { useState, useEffect } from "react";
// import { debug } from "webpack"
import { fetchNews } from "../../util/stock_util";

function NewsFeed() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews()
      .then(news => {
        const newsList = [];
        news.articles.forEach(article => {
          if (article.image) newsList.push(article);
        });
        // debugger
        setArticles(newsList);
      });
  }, []);

  return (
    <div>
      {articles.length ? (
        <div className="newsfeed-container">
          <h2>News</h2>
          {articles.map(article => (
            <a href={article.url} key={article.title} target="_blank">
              <div className="article-container">
                <div className="article-header-container">
                  <h4 className="article-header">{article.source.name}</h4>
                </div>
                <div className="article-body">
                  <div className="article-content">
                    <div className="article-title">{article.title}</div>
                    <br />
                    <div className="article-body">{article.description}</div>
                  </div>
                  <div className="article.image"></div>
                </div>
                <div className="img-div">
                  <img className="article-img" src={article.image} />
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewsFeed;