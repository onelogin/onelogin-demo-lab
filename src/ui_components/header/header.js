import React from 'react';
import withAuthenticatedUser from '../../HOC/with_authenticated_user';

let Header = (props) => {
  let linkString = "/login";
  let userNameString = "Log In"

  if(props.currentUser){
    linkString = "/profile";
    userNameString = props.currentUser.name_first + " " + props.currentUser.name_last;
  }
  return (
    <header className="header">
      <div className="title">
        <h1 className="main-title">Access</h1>
        <h4 className="subtitle">Manage your account</h4>
      </div>
      <div className="header-right-link">
        <a className="user-link" href="/signup">Sign Up</a>
      </div>
      <div className="header-right-link">
        <a className="user-link" href="/login">Sign Out</a>
      </div>
    </header>
  );
}

Header = withAuthenticatedUser(Header)

export default Header
