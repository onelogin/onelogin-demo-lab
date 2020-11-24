import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import SignupForm from '../../ui_components/forms/signup_form';
import Popup from '../../ui_components/popup/popup';

class SignupPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmEmail: false,
      wrongPassword: false,
      userExists: false,
      mismatchPassword: false,
      isAuthenticated: false,
      backendError: ""
    }
  }

  handleSignup = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.BACKEND_URL;
    console.log("disconnected mode: ", process.env.DISCONNECTED_BACKEND == "true")

    let email = event.target.children.emailAddress.value;
    let password = event.target.children.password.value;
    let passwordConfirm = event.target.children.passwordConfirm.value;

    if( password != passwordConfirm ) {
      this.setState({...this.state, mismatchPassword: true});
    }
    else {
      if(process.env.DISCONNECTED_BACKEND == "true"){
        this.props.setUser({ isAuthenticated: true })
      } else {
        axios.post(`${authServiceUrl}/auth/signup`,
          { email, password },
          { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
        ).then( res => {
          this.props.setUser({ isAuthenticated: true });
        } ).catch(err => {
          this.setState( {
            ...this.state,
            backendError: err.response.data.error || err.response.data.message
          } )
        } )
      }
    }
  }

  resetServerError = () => this.setState({...this.state, backendError: false})
  resetConfirmEmail = () => this.setState({...this.state, confirmEmail: false})
  resetMismatch = () => this.setState({...this.state, mismatchPassword: false})
  resetUserExists = () => this.setState({...this.state, userExists: false})

  render(){
    if(this.props.isAuthenticated) return <Redirect to="/profile" />
    return (
      <AppWrapper activePage="signup">
        <div className="splash-page">
          {this.state.backendError != "" ? <Popup text={this.state.backendError} close={this.resetServerError}/> : null}
          {this.state.mismatchPassword ? <Popup text="Password and Password Confirmation do not match" close={this.resetMismatch}/> : null}
          {this.state.userExists ? <Popup text="User with that email already exists" close={this.resetUserExists}/> : null}
          <div className="form">
            <SignupForm className="form" formTitle="Sign Up" handleSignup={this.handleSignup}/>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

SignupPage = withAuthenticatedUser(SignupPage)

export default SignupPage;
