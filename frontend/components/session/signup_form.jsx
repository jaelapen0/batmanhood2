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

    checkFormValidations() {
        let validForm = true;
        let form_errors = [];

        if (this.state["email"].length < 1) {
            validForm = false;
            // errors["email"] = "Cannot be empty";
            form_errors.push("email cannot be empty")
        }
        if (this.state["first_name"].length < 1) {
            validForm = false;
            // errors["first_name"] = "Cannot be empty";
            form_errors.push("first_name cannot be empty")
        }
        if (this.state["last_name"].length < 1) {
            validForm = false;
            // errors["last_name"] = "Cannot be empty";
            form_errors.push("email cannot be empty")
        }
        if (this.state["password"].length < 6) {
            validForm = false;
            // errors["password"] = "Cannot be empty";
            form_errors.push("email cannot be empty")
        }
        this.setState({ form_errors })
        return form_errors

    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        
        if (this.checkFormValidations().length === 0 && !this.props.errors) {
            debugger;
            //    return <Redirect to="root"></Redirect>
            this.props.history.push("/")
        }
        else{ 
            debugger;
            this.render()}
    }

    render() {
        return (
            <div id="signup-form">
                {/* <TextInput style={{ borderColor: this.state.errors.include('first_name') ? 'red' : 'transparent' }} /> */}
                <h2>Make Your Money Move</h2>
                <SignupSide />

                <h4>Robinhood lets you invest in companies you love, commission-free.</h4>
            <p>{this.props.errors ? this.props.errors : null}</p>
            
                <form onSubmit={this.handleSubmit} >
                        <input
                            className="login-input"
                            name="first_name"
                            type="text"
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