import React from 'react';

import SubmitButton from '../submit_button/submit_button';

const SignupForm = (props) => {
  return (
    <form onSubmit={props.handleSignup}>
      <input placeholder="Email" type="email" name="emailAddress"/><br/>
      <input placeholder="Password" type="password" name="password"/><br/>
      <input placeholder="Confirm Password" type="password" name="passwordConfirm"/><br/><br/>
      <SubmitButton text="Sign Up"/>
    </form>
  );
}

export default SignupForm;
