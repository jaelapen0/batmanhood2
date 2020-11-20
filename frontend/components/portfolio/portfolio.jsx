import React from "react";

class Portfolio extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="portfolio-container">
                {/* portfo */}
                <h1 className="portfolio-balance"></h1>
                <h3 className="daily-change">Daily Change</h3>
            </div>
        )
    }
}

export default Portfolio