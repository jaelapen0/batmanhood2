import React from 'react';
import SignUpFinePrint from './signup_fine_print';
import SignupSide from "./signup_side"
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            form_errors: []
            
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        this.setState({ errors: this.props.errors })
    }
    
    render() {
        return (
            <div id="signup-form">
                <h2>Make Your Money Move</h2>
                <SignupSide />

                <h4>Robinhood lets you invest in companies you love, commission-free.</h4>
                <p id="login_errors">{(this.state.errors && this.props.errors.length > 0 && (!this.props.errors[0].includes("Invalid"))) ? this.props.errors.map(error=>(
                        error + ". "
                    )) : null}</p>
            
                <form onSubmit={this.handleSubmit} >
                        <input
                            className="login-input"
                            name="first_name"
                            type="text"
                            autoFocus
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.update('first_name')}   
                        />
                        <input
                            className="login-input"
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.update('last_name')}
                        />
                        <br/>

                        <input
                            className="login-input"
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                    <br/>
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                        />
                    <br />
                    <input id="form-button" type="submit" value="Sign Up" />
                </form>
                <SignUpFinePrint/>
            </div>)
    }
}


export default SignupForm;