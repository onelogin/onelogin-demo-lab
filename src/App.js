import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SplashPage from './pages/splash_page/splash_page';
import Profile from './pages/profile/profile';
import { connect } from "react-redux";

import './main.scss';

class App extends Component {
  render(){
    let rootRoute = this.props.isAuthenticated ?
      <Route exact path="/" component={Profile} /> :
      <Route exact path="/" component={SplashPage} />

    return (
      <BrowserRouter>
        {rootRoute}
        <Route path="/login" component={SplashPage} />
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
