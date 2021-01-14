import React from "react"


class StockWatchlist extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
      }

      this.handleWatchList = this.handleWatchList.bind(this);
   }

   componentDidMount(){
      debugger;
      this.props.fetchWatchList(this.props.ticker_symbol)
      .then(result =>{
         debugger;
         this.setState({result})
      })
   }

   handleWatchList(e){
      debugger;
      if (e.target.innerText.includes("Add")){
         this.props.createWatchlist({ ticker_symbol: this.props.ticker_symbol })
            .then(result =>{
               debugger;
               let watchlist = {}
               watchlist.watchlist = [result]
               this.setState({
                  result: watchlist})
               })
         }
      else{
         this.props.deleteWatchlist({id:this.props.ticker_symbol})
            .then(result => {
               this.setState({
                  result: {watchlist: []}
               })
            })
      }
   }
   render(){
      // debugger;
      return(
         <div 
            style={{borderTop: "1px solid lightgray"}}
         // className="watchlist-container"
         >
            {this.state.result && this.state.result.watchlist.length  > 0 ? 
               <button className="order-button" 
               onClick={this.handleWatchList} 
               style={{backgroundColor: this.props.color}}
               >
                  Remove from List
               </button>
               :
               <button className="order-button"
               onClick={this.handleWatchList} 
                  style={{ backgroundColor: this.props.color }}
               >
                  
                  Add to List
               </button>
            }
         </div>
      )
   }
}

export default StockWatchlist;