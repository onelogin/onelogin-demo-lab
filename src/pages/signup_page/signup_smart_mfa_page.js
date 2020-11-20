import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import SMSSignupForm from '../../ui_components/forms/sms_signup_form';
import Popup from '../../ui_components/popup/popup';
import OTPModal from '../../ui_components/modals/otp_modal';


class SignupSmartMFAPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmEmail: false,
      wrongPassword: false,
      userExists: false,
      mismatchPassword: false
    }
  }

  handleSignup = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.BACKEND_URL;

    let email = event.target.children.emailAddress.value;
    let password = event.target.children.password.value;
    let passwordConfirm = event.target.children.passwordConfirm.value;
    let phone = event.target.children.phone.value;

    if(password != passwordConfirm){
      this.setState({...this.state, mismatchPassword: true});
    }
    else {
      axios.post(`${authServiceUrl}/auth/signup`,
        { user_identifier: email, phone, password },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, }
      ).then(res => {
        if(res.data.otp_sent || process.env.DEBUG_MODAL == "true"){
          this.setState({...this.state, stateToken: res.data.state_token, listeningForOTP: true});
        } else {
          this.props.setUser({ isAuthenticated: true });
        }
      }).catch(err => {
        if(process.env.DEBUG_MODAL == "true") {
          this.setState({...this.state, stateToken: "token", listeningForOTP: true});
          console.log("Skipping for DEBUG MODAL")
        } else if(process.env.DEBUG_PROFILE == "true") {
          this.props.setUser({ isAuthenticated: true });
          console.log("Skipping to DEBUG PROFILE")
        } else {
          this.setState({...this.state, serverError: true});
        }
      })
    }
  }

  acceptOTP = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.BACKEND_URL;
    let otp_token = event.target.children.otp.value;
    let state_token = this.state.stateToken;
    axios.post(`${authServiceUrl}/auth/otp`,
      { otp_token, state_token },
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, }
    ).then(res => {
      this.setState( {...this.state, listeningForOTP: false} );
      this.props.setUser({ isAuthenticated: true })
    }).catch( err => {
      if(process.env.DEBUG_PROFILE == "true") {
        this.props.setUser({ isAuthenticated: true })
        console.log("Skipping for debug")
      } else {
        console.log("Invalid OTP", err)
      }
    } );
  }

  resetServerError = () => this.setState({...this.state, serverError: false})
  resetConfirmEmail = () => this.setState({...this.state, confirmEmail: false})
  resetMismatch = () => this.setState({...this.state, mismatchPassword: false})
  resetUserExists = () => this.setState({...this.state, userExists: false})
  closeOTPModal = () => this.setState({...this.state, listeningForOTP: false})

  render(){
    if(this.props.isAuthenticated){
      return <Redirect to="/profile" />
    }
    return (
      <AppWrapper activePage="signup_smart_mfa">
        <div className="splash-page">
          {this.state.listeningForOTP ? <OTPModal action={this.acceptOTP} close={this.closeOTPModal}/> : null}
          {this.state.serverError ? <Popup text="The User Exists Already" close={this.resetServerError}/> : null}
          {this.state.mismatchPassword ? <Popup text="Password and Password Confirmation do not match" close={this.resetMismatch}/> : null}
          {this.state.userExists ? <Popup text="User with that email already exists" close={this.resetUserExists}/> : null}
          <div className="form">
            <SMSSignupForm className="form" handleSignup={this.handleSignup}/>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

SignupSmartMFAPage = withAuthenticatedUser(SignupSmartMFAPage)

export default SignupSmartMFAPage;
