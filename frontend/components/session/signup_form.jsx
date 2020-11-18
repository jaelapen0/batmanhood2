import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            password: ""
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
        let errors = {};

        if (this.state["email"].length > 1) {
            validForm = false;
            errors["email"] = "Cannot be empty";
        }
        if (this.state["first_name"].length > 1) {
            validForm = false;
            errors["first_name"] = "Cannot be empty";
        }
        if (this.state["last_name"].length > 1) {
            validForm = false;
            errors["last_name"] = "Cannot be empty";
        }
        if (this.state["password"].length > 6) {
            validForm = false;
            errors["password"] = "Cannot be empty";
        }

    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        
    }

    render() {
        return (
            <div>
                {/* <TextInput style={{ borderColor: this.state.errors.include('first_name') ? 'red' : 'transparent' }} /> */}
                <h1>Sign Up</h1>
            <p>{this.props.errors ? this.props.errors : null}</p>
                <form onSubmit={this.handleSubmit} >
                    
                    
                   
                        <input
                            name="first_name"
                            type="text"
                            placeholder="First Name"
                            value={this.state.first_name}
                            onChange={this.update('first_name')}   
                        />
                  
                        <input
                            name="last_name"
                            type="text"
                            placeholder="Last Name"
                            value={this.state.last_name}
                            onChange={this.update('last_name')}
                        />
                        <br/>

                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                
                    <br/>
                    
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.update('password')}
                        />
                    <br />
                    <input type="submit" value="Sign Up" />
                </form>
            </div>)
    }
}


export default SignupForm;