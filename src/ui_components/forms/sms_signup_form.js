import React from 'react';

import SubmitButton from '../buttons/submit_button';

const SMSSignupForm = (props) => {
  return (
    <div>
      <h4 className="splash-header">Sign Up + SMS</h4>
      <form className="input-form" onSubmit={props.handleSignup}>
        <h4>Credentials</h4>
        <input className="input-form-field onelogin-input" placeholder="Email" type="email" name="emailAddress" required/><br/>
        <input className="input-form-field onelogin-input" placeholder="Password" type="password" name="password"/><br/>
        <input className="input-form-field onelogin-input" placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/><br/>
        <h4>Register Phone</h4>
        <input className="input-form-field onelogin-input" placeholder="Phone: xx-123-456-7890" type="tel" name="phone" required/>
        <br/><br/>
        <SubmitButton text="Sign Up"/>
      </form>
    </div>
  );
}

export default SMSSignupForm;
