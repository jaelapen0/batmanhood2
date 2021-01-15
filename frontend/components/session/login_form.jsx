import React from 'react';
import {Redirect} from "react-router-dom"
import LoginBackground from "./login_background"
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
        this.render = this.render.bind(this)
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
       this.setState({errors: this.props.errors})
        
    }
   
    
    render(){
        
   
        return (
            <div id="login-main"> 
            <LoginBackground/>
            <div id="login-div">
                    <p id="login_errors" color="red">{(this.state.errors && this.props.errors.length > 0 && (!this.props.errors[0].includes("blank") && !this.props.errors[0].includes("too short") && !this.props.errors[0].includes("Email"))) ? this.props.errors : null}</p>
                <form onSubmit={this.handleSubmit} >
                    <h3 className="login-header">Welcome to Batmanhood</h3>
                    <label className="login-label">Email
                        <br/>
                        <input
                            type="text"
                            autoFocus
                            className="login-input"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.update('email')}
                            style={{ borderColor: this.state.form_errors.includes('email') ? 'red' : 'gray' }}
                        />
                    </label>
                    <br />
                   
                        <label className="login-label">Password
                        <br/>
                        <input
                            type="password"
                                className="login-input"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            style={{ borderColor: this.state.form_errors.includes('password') ? 'red' : 'gray' }}
                        />
                    </label>
                    <br />
                    <input id="form-button" type="submit" value={this.props.formType} />
                </form>
                    
            </div>
            </div>
            )
    }
}


export default SignupForm;