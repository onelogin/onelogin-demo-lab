import React, { Component } from 'react';
import axios from 'axios';
import qs from "qs";
import * as base64 from 'base64-js'

import SubmitButton from '../../ui_components/buttons/submit_button';
import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import Popup from '../../ui_components/popup/popup';

class LoginPKCEPageWithClient extends Component {
  render = () => {
    return (
      <AppWrapper activePage="login_pkce_with_client">
        <div className="oidc-splash-page">
          <h4 className="oidc-splash-header">PKCE With Off-Shelf Client</h4>
        </div>
      </AppWrapper>
    )
  }
}

export default LoginPKCEPageWithClient
