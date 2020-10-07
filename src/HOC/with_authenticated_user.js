import React, { Component } from 'react';
import { connect } from "react-redux";
import { setUser } from "../redux/actions";

function withAuthenticatedUser(WrappedComponent) {
  class HOC extends Component {

    constructor(props){
      super(props);
      if(!props.currentUser){
        this.getCurrentUser();
      }
    }

    getCurrentUser = () => {
      let authServiceUrl = process.env.BACKEND_URL;
      fetch(`/${authServiceUrl}/health`, {
        credentials: 'include'
      })
      .then((res) => res.json())
      .then((res) => {
        // if(res.user){
        //   this.props.setUser({
        //     isAuthenticated: true,
        //     currentUser: res.user
        //   })
        // }
      })
    }
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.isAuthenticated,
      currentUser: state.currentUser
    }
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (user) => dispatch(setUser(user))
    }
  };
  return connect(mapStateToProps, mapDispatchToProps)(HOC)
}

export default withAuthenticatedUser;
