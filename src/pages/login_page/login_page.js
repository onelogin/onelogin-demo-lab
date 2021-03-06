import React, { Component } from 'react';
import axios from 'axios';

import { Redirect } from "react-router-dom";
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import LoginForm from '../../ui_components/forms/login_form';
import Popup from '../../ui_components/popup/popup';
import OTPModal from '../../ui_components/modals/otp_modal';


class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmEmail: false,
      wrongPassword: false,
      userExists: false,
      mismatchPassword: false,
      isAuthenticated: false,
      modalVisible: false
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.BACKEND_URL;
    let user_identifier = event.target.children.emailAddress.value;
    let password = event.target.children.password.value;

    console.log("disconnected mode: ", process.env.DISCONNECTED_BACKEND == "true")
    if(process.env.DISCONNECTED_BACKEND == "true"){
      this.props.setUser({ isAuthenticated: true })
    } else {
      axios.post(`${authServiceUrl}/auth/login`,
        { user_identifier, password },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, }
      ).then((res) => {
        if(res.data.otp_sent){
          this.setState({...this.state, activeStateToken: res.data.state_token});
        } else {
          this.props.setUser({ isAuthenticated: true })
        }
      }).catch(err => {
        this.setState({...this.state, serverError: true});
      })
    }
  }

  acceptOTP = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.BACKEND_URL;
    let otp_token = event.target.children.otp.value;
    let state_token = this.state.stateToken;
    if(process.env.DISCONNECTED_BACKEND == "true"){
      this.props.setUser({ isAuthenticated: true })
    } else {
      axios.post(`${authServiceUrl}/auth/otp`,
        { otp_token, state_token },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, }
      ).then(res => {
        this.setState( {...this.state, listeningForOTP: false} );
        this.props.setUser({ isAuthenticated: true })
      }).catch( err => {
        console.log("Invalid OTP", err)
      } );
    }
  }

  resetConfirmEmail = () => this.setState({...this.state, confirmEmail: false})
  resetUnauthorized = () => this.setState({...this.state, wrongPassword: false})
  closeOTPModal = () => this.setState({...this.state, listeningForOTP: false})

  render(){
    if(this.props.isAuthenticated){
      return <Redirect to="/profile" />
    }
    return (
      <AppWrapper activePage="login">
        <div className="splash-page">
          {this.state.listeningForOTP ? <OTPModal action={this.acceptOTP} close={this.closeOTPModal}/> : null}
          {this.state.confirmEmail ? <Popup text="Please check your email and confirm your address to continue" close={this.resetConfirmEmail}/> : null}
          {this.state.wrongPassword ? <Popup text="Wrong password given" close={this.resetUnauthorized}/> : null}
          {this.state.mismatchPassword ? <Popup text="Password and Password Confirmation do not match" close={this.resetMismatch}/> : null}
          {this.state.userExists ? <Popup text="User with that email already exists" close={this.resetUserExists}/> : null}
          <div className="centered-form">
            <LoginForm formTitle="Log In" handleLogin={this.handleLogin}/>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

LoginPage = withAuthenticatedUser(LoginPage)

export default LoginPage;
