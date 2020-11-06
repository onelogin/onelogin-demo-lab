import React from 'react';

import SubmitButton from '../buttons/submit_button';

const SignupForm = (props) => {
  return (
    <div>
      <h4 className="splash-header">Sign Up</h4>
      <form className="input-form" onSubmit={props.handleSignup}>
        <input className="input-form-field" placeholder="Email" type="email" name="emailAddress"/><br/>
        <input className="input-form-field" placeholder="Password" type="password" name="password"/><br/>
        <input className="input-form-field" placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/><br/>
        <SubmitButton text="Sign Up"/>
      </form>
    </div>
  );
}

export default SignupForm;
