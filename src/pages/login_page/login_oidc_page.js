import React, { Component } from 'react';
import axios from 'axios';
import base64url from 'base64url';
import crypto from 'crypto-js';

import { Redirect } from "react-router-dom";
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import LoginForm from '../../ui_components/forms/login_form';


class LoginPage extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
    let oidc_client_id = process.env.OIDC_CLIENT_ID;
    let redirect_uri = "http://localhost/login_oidc";
    let code_verifier = 'helloworld';
    let code_challenge = crypto.SHA256(code_verifier).toString(crypto.enc.Base64)
    axios.get(
      `/onelogin/oidc/2/auth?client_id=${oidc_client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=openid&code_challenge_method=S256&code_challenge=${code_challenge}`,
      { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, }
    ).then((res) => {
      console.log(res)
    }).catch(err => {
      console.log("ERR", err)
    })
  }

  render(){
    if(this.props.isAuthenticated){
      return <Redirect to="/profile" />
    }
    return (
      <AppWrapper activePage="login_oidc">
        <div className="splash-page">
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
