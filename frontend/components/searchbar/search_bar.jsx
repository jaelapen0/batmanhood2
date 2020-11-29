import React from "react"
import { Link } from 'react-router-dom';

class SearchBar extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            results: [],
            // [results.results]: []
            input: ""
        }
        this.clickAway = this.clickAway.bind(this)
    }
    // componentDidMount(){
    //     debugger;
    // //    if (Object.keys(this.state.results.results).length)
    // //     {
    // //         this.render()
    // //     }
    
    // }
    // shouldComponentUpdate(){
    //     debugger;
    //     return true;
    //     // this.setState(length ==)
    //     // return this.state.results.results? true: true
    // }
    // componentDidUpdate(prevProps){
    //     debugger;
    //     // if (this.state.results.l)
    // }
    update(field){
       debugger;
        return e => {
            
            if (this.state.input.length > 0) {
                this.props.fetchSearchResults(this.state.input)
                .then(results => {
                    // debugger
                    this.setState({results})
                })
            }
            
            this.setState({ [field]: e.currentTarget.value })
        }
    }

    clickAway(){
        if (this.state.results.results){
        this.setState({results: {}})
        }
    }
    render(){
        let results = {};
        if (this.state.results.results && Object.keys(this.state.results.results).length) {
            results = this.state.results.results}
        return(
            <div className="searchbar-container" >
                <input className="searchbar-input" 
                    //    onClickAway={this.clickAway()}
                       placeholder="Search.." type="text"
                       onChange={this.update("input")}
                />

                {this.state.results.results && Object.keys(this.state.results.results).length > 0 ? 
                    
                    (   
                        
                        Object.values(results).map(result => {
                         debugger
                          return ( <div className="search-result"> 
                                <Link 
                                    to={`/stocks/${result.ticker_symbol}`}> 
                                    {result.tags}
                                </Link>
                            </div>)
                        })
                    )
                    : ""
                }
                
            </div>
        )
    }

}

export default SearchBar