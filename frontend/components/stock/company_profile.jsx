import React from "react"
// import { debug } from "webpack"
import {fetchCompanyProfile} from "../../util/stock_util"
class CompanyProfile extends React.Component{
    constructor(props){
    super(props)
    }

    componentDidMount(){
        fetchCompanyProfile(this.props.ticker)
        .then(companyProfile => {
            // ;
            const company = companyProfile[0]

            this.setState({ ceo: company.ceo, 
                            mktCap: company.mktCap, 
                            sector: company.sector,
                            city: company.city,
                            state: company.state,
                            ipoDate: company.ipoDate,
                            industry: company.industry,
                            website: company.website,
                            companyName: company.companyName,
                            description: company.description  })
            // 
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            fetchCompanyProfile(this.props.ticker)
                .then(companyProfile => {
                    // ;
                    const company = companyProfile[0]

                    this.setState({
                        ceo: company.ceo,
                        mktCap: company.mktCap,
                        sector: company.sector,
                        city: company.city,
                        state: company.state,
                        ipoDate: company.ipoDate,
                        industry: company.industry,
                        website: company.website,
                        companyName: company.companyName,
                        description: company.description
                    })
                    // 
                })
        }
    }
    render(){
        // ;
       
        return(
            <div>
                    <div>{this.state?
                          
                        (
                        <div className="profile-outer-container">
                                <h2>About</h2>
                                <h5>{this.state.description}</h5>
                                <div className="profile-list">
                                    <div>
                                        <p className="profile-list-label">CEO</p>
                                        <p>{this.state.ceo}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">Market CAP</p>
                                        <p>{(this.state.mktCap).toLocaleString()}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">Sector</p>
                                        <p>{this.state.sector}</p>
                                    </div>

                                    <div>
                                    <p className="profile-list-label">Headquarters</p>
                                        <p>{this.state.city}, {this.state.state}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">IPO Date</p>
                                        <p>{this.state.ipoDate}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">Company Name</p>
                                        <p>{this.state.companyName}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">Industry</p>
                                        <p>{this.state.industry}</p>
                                    </div>
                                    <div>
                                    <p className="profile-list-label">Website</p>
                                        <p>{this.state.website}</p>
                                    </div>
                                </div>
                            </div>
                            
                        ): ""}
                        
                    </div>
            </div>
        )
    }
}

export default CompanyProfile;