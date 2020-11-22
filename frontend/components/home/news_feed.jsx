import React from "react"
// import { debug } from "webpack"
import { fetchNews } from "../../util/stock_util"
class NewsFeed extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        fetchNews()
            .then(news => {
                // debugger;
                const newsList = news.articles;

                this.setState({
                    articles: newsList
                    // .splice(10,10)
                })
                // debugger
            })
    }
    render() {
        // debugger;

        return (
            <div>
                {this.state?
                (
                  <div className="newsfeed-container"> 
                  <h2>News</h2>
                    {this.state.articles.map(article =>(
                        <div className="article-container">
                            <div className='article-header-container'>

                            <h4 className="article-header">{article.source.name}</h4>
                            </div>
                            <div className="article-body">
                                <div className="article-content">
                                    <div className="article-title">{article.title}</div>
                                    <br/>
                                    <div className="article-body">{article.description}</div>
                                </div>
                                <div className="article.image"></div>
                            </div>
                            <div className="img-div">
                                <img className="article-img" src={article.urlToImage} />
                                
                            </div>
                        </div>
                    ))}  

                  </div>  
                )   : "" }
            </div>
        )
    }
}

export default NewsFeed;