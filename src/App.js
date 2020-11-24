import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import LoginPage from './pages/login_page/login_page';
import SignupSmartMFAPage from './pages/signup_page/signup_smart_mfa_page';
import SignupPage from './pages/signup_page/signup_page';
import Profile from './pages/profile/profile';
import { connect } from "react-redux";

import './main.scss';

class App extends Component {
  render(){
    let rootRoute = this.props.isAuthenticated ?
      <Route exact path="/" component={Profile} /> :
      <Route exact path="/" component={LoginPage} />

    return (
      <BrowserRouter>
        {rootRoute}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/signup_smart_mfa" component={SignupSmartMFAPage} />
        <Route path="/profile" component={Profile} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { isAuthenticated: state.isAuthenticated }
};

App = connect(mapStateToProps)(App)

export default App;
