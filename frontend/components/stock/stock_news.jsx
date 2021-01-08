import React from "react"
// import { debug } from "webpack"
import { fetchCompanyNews } from "../../util/stock_util"
class StockNews extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        fetchCompanyNews(this.props.ticker)
            .then(news => {
                // ;
                const newsList = []
                news.articles.slice(10).forEach(article => {
                    if (article.urlToImage) newsList.push(article)
                })
                // const newsList = news.articles;
                this.setState({
                    articles: newsList
                    // .splice(10,10)
                })
            })
    }

    componentDidUpdate(prevProps) {
        // ;
        if ( this.props.ticker !== prevProps.ticker ) {

            fetchCompanyNews(this.props.ticker)
                .then(news => {
                    const newsList = []

                    news.articles.slice(10).forEach(article => {
                        if (article.urlToImage) newsList.push(article)
                    })
                    this.setState({
                        articles: newsList
                    })
                })
        }
    }


    render() {
        // ;
        return (
            <div>
                {this.state ?
                    (
                        <div className="stocknews-container">
                            <h2>News</h2>
                            {this.state.articles.map(article => (
                                <a href={article.url} key={article.title} target="_blank">
                                    <div className="article-container">
                                        <div className='article-header-container'>
                                            <h4 className="article-header">{article.source.name}</h4>
                                        </div>
                                        <div className="article-body">
                                            <div className="stock-article-content">
                                                <div className="article-title">{article.title}</div>
                                                <br />
                                                <div className="article-body">{article.description}</div>
                                            </div>
                                            <div className="article.image"></div>
                                        </div>
                                        <div className="stock-img-div">
                                            <img className="article-img" src={article.urlToImage} />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : ""}
            </div>
        )
    }
}

export default StockNews;