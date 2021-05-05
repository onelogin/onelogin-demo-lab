import React from 'react';

import SubmitButton from '../buttons/submit_button';

const SignupForm = (props) => {
  return (
    <form className="left-aligned-input-form" onSubmit={props.handleSignup}>
      <h4 className="splash-header">{props.formTitle || "Sign Up"}</h4>
      <h4>Credentials</h4>
      <input className="input-form-field onelogin-input" placeholder="Email" type="email" name="emailAddress" required/>
      <input className="input-form-field onelogin-input" placeholder="Password" type="password" name="password"/>
      <input className="input-form-field onelogin-input" placeholder="Confirm Password" type="password" name="passwordConfirm"/>
      <SubmitButton text="Sign Up"/>
    </form>
  );
}

export default SignupForm;
