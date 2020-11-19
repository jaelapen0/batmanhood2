import React from 'react';
import {Redirect} from "react-router-dom"
class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            errors: {},
            form_errors: []
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.render = this.render.bind(this)
        this.checkFormValidations = this.checkFormValidations.bind(this)
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    componentWillUnmount(){
        
    }

    checkFormValidations() {
        let validForm = true;
        let form_errors = [];

        if (this.state["email"].length < 1) {
            validForm = false;
            form_errors.push("Email cannot be empty")
        }
      
        if (this.state["password"].length < 6) {
            validForm = false;
            form_errors.push("Password cannot be empty")
        }

        this.setState({ form_errors})
        return form_errors
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        if (this.checkFormValidations().length === 0) {
            //    return <Redirect to="root"></Redirect>
            this.props.history.push("/")
        }
        else { this.render() }
    }

    render(){
   
        return (
            
            <div id="login-div">
                <p id="login_errors">{this.props.form_errors ? this.props.form_errors : null}</p>
                <p id="login_errors" color="red">{this.props.errors ? this.props.errors : null}</p>
                <form onSubmit={this.handleSubmit} >
                    
                    <label>Email:
                        <input
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.update('email')}
                            style={{ borderColor: this.state.form_errors.includes('email') ? 'red' : 'gray' }}
                        />
                    </label>
                    <br />
                   
                    <label>Password:
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            style={{ borderColor: this.state.form_errors.includes('password') ? 'red' : 'gray' }}
                        />
                    </label>
                    <br />
                    <input id="form-button" type="submit" value={this.props.formType} />
                </form>
                    
            </div>)
    }
}


export default SignupForm;