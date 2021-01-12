import React from "react"
import { Link } from 'react-router-dom';
import ClickOutHandler from 'react-onclickout';
class SearchBar extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            results: [],
            // [results.results]: []
            input: "",
            visibleResults: false
        }
        // this.clickAway = this.clickAway.bind(this)
        this.makeSearchRequest = this.makeSearchRequest.bind(this);
        this.toggleOn = this.toggleOn.bind(this);
        this.toggleOff = this.toggleOff.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    
    componentDidUpdate(prevProps, prevState){
        // ;
    //     // if (this.state.results.l)
    }

    toggleResults(){

    }
    update(field){
    //    ;
        return e => {
        
            this.setState({ [field]: e.currentTarget.value, }, this.makeSearchRequest)
            // if (this.state.input.length === 0) { this.setState({ visibleResults: false }) }
        }

       
    }

    makeSearchRequest(){
        if (this.state.input.length > 0) {
            this.setState({ visibleResults: true })
        
            this.props.fetchSearchResults(this.state.input)
                .then(results => {
                    
                    this.setState({ results }, this.render)
                })
        }
        else { this.setState({ visibleResults: false })}
    }
    toggleOn(e){
        // let visibleResults = this.state.visibleResults
        // ;
        // visibleResults === true ? 
        // this.setState({visibleResults: false}) :
        this.setState({visibleResults: true})
    }

    toggleOff(e) {
        // let visibleResults = this.state.visibleResults
        // ;
        // visibleResults === true ?
        //     this.setState({ visibleResults: false }) :
            this.setState({ visibleResults: false })
    }

    handleSelect(e){
        ;
    }
    render(){
        let results = [];
        if (this.state.results.results && Object.keys(this.state.results.results).length){
            results = this.state.results.results}
        return(
            <div className="searchbar-container" onFocus={this.toggleOn} >
                <ClickOutHandler onClickOut={this.toggleOff}> 
                <input className="searchbar-input" 
                    //    onClickAway={this.clickAway()}
                       placeholder="Search.." type="text"
                       onChange={this.update("input")}
                />
                    <ul className="search-ul">
                    {this.state.results.results && this.state.visibleResults === true && Object.keys(this.state.results.results).length > 0? 
                    
                    (   
                        
                        Object.values(results).map(result => {
                        //  
                          return ( <div id={result.ticker_symbol} className="search-result" onClick={this.handleSelect}> 
                              <Link className="searchresult-link" onClick={this.toggleOff}
                                    to={`/stocks/${result.ticker_symbol}`}> 
                                    {result.tags}
                                </Link>
                            </div>)
                        })
                    )
                    : ""
                        }</ul>
                </ClickOutHandler>
            </div>
        )
    }

}

export default SearchBar