import React from "react"
const SignupSide = () => {
    return(
        <div className="signup-side">
            <h5>
                Commission-free stock trading
            </h5>
                <p>
                    We’ve cut the fat that makes other brokerages costly, 
                    like manual account management and hundreds of storefront locations, 
                    so we can offer zero commission trading.
                </p>
            <h5>
                Account Protection
            </h5>
                <p>
                Batmanhood Financial is not a member of SIPC. 
                Securities in your account are protected up to $500,000. 
                    For details, please see  <a className="linx" href={"https://www.sipc.org"} target="_blank">www.sipc.org</a>.
                </p>
            <h5>
                Keep tabs on your money
            </h5>
                <p>
                    Set up customized news and notifications to stay on top of your assets as
                    casually or as relentlessly as you like. Controlling the flow of info is up to you.
                </p>    
        </div>
    )
}

export default SignupSide;