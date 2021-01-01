import React, { Component } from 'react';
import axios from 'axios';
import qs from "qs";
import * as base64 from 'base64-js'

import SubmitButton from '../../ui_components/buttons/submit_button';
import AppWrapper from '../../ui_components/app_wrapper/app_wrapper'
import Popup from '../../ui_components/popup/popup';

class LoginOIDCPage extends Component {

  constructor( props ){
    super( props );

    this.query = new URLSearchParams( this.props.location.search );
    this.state = {
      authCode: this.query.get( 'code' ),
      errorMessage: this.query.get( 'error_description' ),
      authURL: "",
      user: {}
    };

    // clean out local storage when code_verifier gets computed but page gets refreshed
    if ( this.state.authURL == "" && localStorage.getItem( 'code_verifier' ) && !this.state.authCode ) {
      localStorage.clear();
    }

    // need auth url and code verifier so we comput both
    if ( this.state.authURL == "" && !localStorage.getItem( 'code_verifier' ) ) {
      PKCEAuthCodeFirstStep().then( url => {
        this.setState( { ...this.state, authURL: url } );
      } ).catch( e => {
        console.log( "First step error", e );
        localStorage.clear();
      } );
    }

    // check if we have an access token from previous login and pull user info from IdP
    if ( localStorage.getItem( 'access_token' ) ) {
      getUserInfo().then( user => {
        this.setState( { ...this.state, user } );
      } );
    } // if we dont have access token but we have the auth code, it must be second step time
    else if (this.state.authCode) {
      PKCEAuthCodeSecondStep(this.state.authCode).then( token => {
        getUserInfo().then( user => {
          this.setState( { ...this.state, user } );
        } );
      } ).catch( e => {
        console.log( "Second step error", e );
        localStorage.clear();
      } );
    }
  }

  resetErrorMessage = () => this.setState( { ...this.state, errorMessage: null } );

  logout = (e) => {
    this.setState( {} );
    localStorage.clear();
    this.props.history.push( "/login" );
  }

  render = () => {
    return (
      <AppWrapper activePage="login_oidc">
        <div className="oidc-splash-page">
          <h4 className="oidc-splash-header">OIDC PKCE</h4>
          {
            this.state.errorMessage ?
              <Popup text={this.state.errorMessage} close={this.resetErrorMessage}/>
              :
              null
          }
          {
            !this.state.authCode && !localStorage.getItem("access_token") ?
              <a className="oidc-link" href={this.state.authURL}>Log In</a>
              :
              <div className="user-info-container">
                <h4 className="oidc-splash-header">Hello {this.state.user.name}</h4>
                <SubmitButton text="log out" onClick={this.logout}/>
              </div>
          }
        </div>
      </AppWrapper>
    )
  }
}

// Encapsulation of the 3 main objectives. PKCE first step & second step, and getting some user info

const PKCEAuthCodeFirstStep = () => {
  let oidcURL = `${process.env.OIDC_IDP_URL}/auth`;
  let queryParams = [`client_id=${process.env.OIDC_CLIENT_ID}`];
  let codeVerifier = createCodeVerifier( 50 );
  localStorage.setItem( 'code_verifier', codeVerifier );

  return createCodeChallenge( codeVerifier ).then( codeChallenge => {
    queryParams.push(`code_challenge=${codeChallenge}`);
    queryParams.push(`redirect_uri=http://localhost/login_oidc`);
    queryParams.push(`code_challenge_method=S256`);
    queryParams.push(`response_type=code`);
    queryParams.push(`scope=openid`);

    return `${oidcURL}?${queryParams.join("&")}`;
  } );
}

const PKCEAuthCodeSecondStep = ( code ) => {
  let oidcURL = `${process.env.OIDC_IDP_URL}/token`;

  let params = qs.stringify( {
    grant_type: "authorization_code",
    redirect_uri: "http://localhost/login_oidc",
    client_id: process.env.OIDC_CLIENT_ID,
    code_verifier: localStorage.getItem( 'code_verifier' ),
    code
  } );

  localStorage.removeItem( 'code_verifier' );
  return axios.post( oidcURL, params,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  ).then( res => {
    localStorage.setItem( 'access_token', res.data.access_token );
    return res.data
  } );
}

const getUserInfo = () => {
  let userInfoURL = `${process.env.OIDC_IDP_URL}/me`;
  let token = localStorage.getItem( 'access_token' );
  return axios.get( userInfoURL,
    { headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    } }
  ).then( res => res.data )
   .catch( err => localStorage.clear() );
}

const createCodeVerifier = ( size ) => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.~';
  const charsetIndexBuffer = new Uint8Array( size );

  for ( let i = 0; i < size; i += 1 ) {
    charsetIndexBuffer[i] = ( Math.random() * charset.length ) | 0;
  }

  let randomChars = [];
  for ( let i = 0; i < charsetIndexBuffer.byteLength; i += 1 ) {
    let index = charsetIndexBuffer[i] % charset.length;
    randomChars.push( charset[index] );
  }

  return randomChars.join( '' );
}

const createCodeChallenge = ( codeVerifier ) => {
  if ( typeof window !== 'undefined' && !!( window.crypto ) && !!( window.crypto.subtle ) ) {
    return new Promise( ( resolve, reject ) => {
      let codeVerifierCharCodes = textEncodeLite( codeVerifier );
      crypto.subtle
        .digest( 'SHA-256', codeVerifierCharCodes )
        .then(
          hashedCharCodes => resolve( urlSafe( new Uint8Array(hashedCharCodes) ) ),
          error => reject( error )
        );
    });
  }
}

const textEncodeLite = ( str ) => {
  const charCodeBuffer = new Uint8Array( str.length );
  for ( let i = 0; i < str.length; i++ ) {
   charCodeBuffer[i] = str.charCodeAt( i );
  }
  return charCodeBuffer;
}

const urlSafe = ( buffer ) => {
  const encoded = base64.fromByteArray( new Uint8Array( buffer ) );
  return encoded.replace( /\+/g, '-' ).replace( /\//g, '_' ).replace( /=/g, '' );
}

export default LoginOIDCPage;
