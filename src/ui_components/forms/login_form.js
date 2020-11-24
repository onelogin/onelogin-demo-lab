import React from 'react';

import SubmitButton from '../buttons/submit_button';

const LoginForm = (props) => {
  return (
    <form className="centered-input-form" onSubmit={props.handleLogin}>
      <h4 className="splash-header">{props.formTitle || "Log In"}</h4>
      <input className="input-form-field onelogin-input" placeholder="Email" type="email" name="emailAddress"/>
      <input className="input-form-field onelogin-input" placeholder="Password" type="password" name="password"/>
      <SubmitButton text="Log In"/>
    </form>
  );
}
export default LoginForm;
