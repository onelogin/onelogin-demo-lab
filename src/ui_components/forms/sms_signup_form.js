import React from 'react';

import SubmitButton from '../buttons/submit_button';

const SMSSignupForm = (props) => {
  return (
    <form className="left-aligned-input-form" onSubmit={props.handleSignup}>
      <h4 className="splash-header">{props.formTitle || "Sign Up + SMS"}</h4>
      <h4>Credentials</h4>
      <input className="input-form-field onelogin-input" placeholder="Email" type="email" name="emailAddress" required/>
      <input className="input-form-field onelogin-input" placeholder="Password" type="password" name="password"/>
      <input className="input-form-field onelogin-input" placeholder="Confirm Password" type="password" name="passwordConfirm"/>
      <br/>
      <h4>Register Phone</h4>
      <input className="input-form-field onelogin-input" placeholder="Phone: xx-123-456-7890" type="tel" name="phone" required/>
      <SubmitButton text="Sign Up"/>
    </form>
  );
}

export default SMSSignupForm;
