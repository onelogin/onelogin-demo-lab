import React from 'react';

import SubmitButton from '../submit_button/submit_button';

const SMSSignupForm = (props) => {
  return (
    <div>
      <h4 className="splash-header">Sign Up + MFA</h4>
      <form className="input-form" onSubmit={props.handleSignup}>
        <h4>Credentials</h4>
        <input className="input-form-field" placeholder="Email" type="email" name="emailAddress" required/><br/>
        <input className="input-form-field" placeholder="Password" type="password" name="password"/><br/>
        <input className="input-form-field" placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/><br/>
        <h4>Register Phone</h4>
        <input className="input-form-field" placeholder="Phone: xx-123-456-7890" type="tel" name="phone" required/>
        <br/><br/>
        <SubmitButton text="Sign Up"/>
      </form>
    </div>
  );
}

export default SMSSignupForm;
