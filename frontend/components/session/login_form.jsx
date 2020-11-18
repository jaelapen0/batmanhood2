import React from 'react';

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

    checkFormValidations() {
        let validForm = true;
        let form_errors = [];

        if (this.state["email"].length > 1) {
            validForm = false;
            form_errors["email"] = "Cannot be empty";
        }
      
        if (this.state["password"].length > 6) {
            validForm = false;
            form_errors["password"] = "Cannot be empty";
        }

        this.setState({ form_errors})
        return validForm;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
        // if (this.checkFormValidations()){
        //     
        //     const user = Object.assign({}, this.state);
        //     this.props.processForm(user);
        // }
        // else{
        //     
        //     this.render();
        //     //  alert(this.state.form_errors)
        //     }
    }

    render() {
   
        return (
            
            <div>
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
                    <input type="submit" value={this.props.formType} />
                </form>
                    
            </div>)
    }
}


export default SignupForm;