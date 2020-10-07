import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import LoginForm from '../../ui_components/login_form/login_form';
import SignupForm from '../../ui_components/signup_form/signup_form';
import Popup from '../../ui_components/popup/popup';

class SplashPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirmEmail: false,
      wrongPassword: false,
      userExists: false,
      mismatchPassword: false
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.REACT_APP_BACKEND_URL;
    fetch(`${authServiceUrl}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: event.target.children.emailAddress.value,
          password: event.target.children.password.value,
        }
      })
    }).then((res) => {
      if(res.status === 200){
        console.log("DING", res)
        if(this.props.location.search){
          let queryStringParts = this.props.location.search.slice(1).split("=");
          let parsedQuery = {}
          for(var i = 0; i < queryStringParts.length - 1; i+=2){
            parsedQuery[queryStringParts[i]] = queryStringParts[i+1]
          }
          if(parsedQuery["redirect"]){
            window.location.replace(parsedQuery["redirect"])
          }
        }
        this.props.setUser({
          isAuthenticated: true
        })
      }
      else {
        this.setState({...this.state, wrongPassword: true})
      }
    })
  }

  handleSignup = (event) => {
    event.preventDefault();
    let authServiceUrl = process.env.REACT_APP_BACKEND_URL;
    console.log("QWER", authServiceUrl)
    fetch(`${authServiceUrl}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: event.target.children.emailAddress.value,
          password: event.target.children.password.value,
          password_confirmation: event.target.children.passwordConfirm.value,
          redirect_url: "https://bouncer.developerdom.com/profile"
        },
      })
    }).then((res) => {
      console.log("ASDFASDF", res)
      if(res.status === 201){
        this.setState({...this.state, confirmEmail: true})
      }
    }).then((res) => {
      if(res.error) {
        this.setState({...this.state, userExists: true})
      }
      if(res.unauthorized){
        this.setState({...this.state, wrongPassword: true})
      }
      if(res.password_confirmation){
        this.setState({...this.state, mismatchPassword: true})
      }
    })
  }

  resetConfirmEmail = () => this.setState({...this.state, confirmEmail: false})
  resetUnauthorized = () => this.setState({...this.state, wrongPassword: false})
  resetMismatch = () => this.setState({...this.state, mismatchPassword: false})
  resetUserExists = () => this.setState({...this.state, userExists: false})

  render(){
    if(this.props.isAuthenticated){
      return <Redirect to="/profile" />
    }
    return (
      <AppWrapper>
        <div className="splash-page">
          {this.state.confirmEmail ? <Popup text="Please check your email and confirm your address to continue" close={this.resetConfirmEmail}/> : null}
          {this.state.wrongPassword ? <Popup text="Wrong password given" close={this.resetUnauthorized}/> : null}
          {this.state.mismatchPassword ? <Popup text="Password and Password Confirmation do not match" close={this.resetMismatch}/> : null}
          {this.state.userExists ? <Popup text="User with that email already exists" close={this.resetUserExists}/> : null}
          <div className="form">
            <h4 className="splash-header">Log In</h4>
            <LoginForm handleLogin={this.handleLogin}/>
          </div>
          <div className="form">
            <h4 className="splash-header">Sign Up</h4>
            <SignupForm className="form" handleSignup={this.handleSignup}/>
          </div>
        </div>
      </AppWrapper>
    )
  }
}

SplashPage = withAuthenticatedUser(SplashPage)

export default SplashPage;
